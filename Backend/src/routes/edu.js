const express = require("express");
//require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const router = express.Router();
const prisma = new PrismaClient();
const { authMiddleware } = require("../middleware");
const { JWT_PASSWORD } = require("../config");
const fs = require("fs").promises;
const path = require("path");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"));
        }
    },
});
const uploadQuestionDir = path.join(__dirname,'eduquestions');
fs.mkdir(uploadQuestionDir,{recursive:true}).catch(console.error);
const rateLimit = require('express-rate-limit');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { cleanupTempDirectory } = require("../utility/cleanupfunction");

// Create a limiter
const uploadLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again after a minute',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function retryWithBackoff(fn, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (error.status === 429 && i < maxRetries - 1) {
                const waitTime = Math.pow(2, i) * 1000; // exponential backoff: 1s, 2s, 4s
                console.log(`Rate limit hit, waiting ${waitTime}ms before retry ${i + 1}`);
                await wait(waitTime);
                continue;
            }
            throw error;
        }
    }
}

router.post(
    "/uploadquestions",
    authMiddleware,
    upload.single("pdf"),
    async (req, res) => {
        let uploadQuestionFilePath=null;
        try {
            await cleanupTempDirectory(uploadQuestionDir);
        if (!req.file) {
            throw new Error("No file uploaded");
        }
            const { originalname, mimetype, buffer } = req.file;
            const uploaderId = req.userId;
            const body = JSON.parse(req.body.infoFile);
            const pdf = await prisma.questionPdf.create({
                data: {
                    name: originalname,
                    data: buffer, 
                    contentType: mimetype,
                    uploaderId,
                    subject : body.subject,
                    level:body.level

                },
            });
            uploadQuestionFilePath = path.join(uploadQuestionDir,`${Date.now()}-${originalname}`);
            await fs.writeFile(uploadQuestionFilePath,buffer);
            const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });
            const result = await retryWithBackoff(async () => {
                return await model.generateContent([
                    {
                        inlineData: {
                            mimeType: mimetype,
                            data: buffer.toString('base64')  // Convert buffer to base64
                        },
                    },
                    {
                        text: `Extract all questions and passages from this file and convert them into JSON format with this structure:
                    {
                    "passages": [
                        {
                        "id": "P1",
                        "text": "full passage text here",
                        "title": "passage title if available",
                        "source": "source if available"
                        }
                    ],
                    "questions": [
                        {
                        "id": "1",
                        "type": "multiple_choice|passage_based|true_false|fill_in_blank",
                        "text": "question text",
                        "marks": number,
                        "passageRef": "P1",  // Reference to the passage if question is passage-based
                        "options": [
                            {"id": "a", "text": "option text"},
                            {"id": "b", "text": "option text"}
                        ],
                        "correctAnswer": "a"
                        }
                    ],
                    "metadata": {
                        "totalQuestions": number,
                        "totalPassages": number,
                        "totalMarks": number,
                        "timeLimit": number,
                        "subject": "subject name",
                        "topic": "topic name if available"
                    }
                    }
                    Rules:
                    1. Each passage should be stored once in the passages array
                    2. Questions should reference their passage using passageRef
                    3. For non-passage questions, omit the passageRef field
                    4. Return ONLY valid JSON without any additional text or comments`
                    }
                ]);
            });
                const responseText = result.response.text();
                
                // Clean the response text to ensure it's valid JSON
                const cleanedText = responseText
                    .replace(/\/\/.*/g, '') // Remove single-line comments
                    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
                    .replace(/[\n\r\t]/g, '') // Remove newlines, carriage returns, and tabs
                    .trim();
                
                // Try to find a valid JSON object
                const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
                if (!jsonMatch) {
                    throw new Error("No JSON object found in response");
                }
                
                const parsedJson = JSON.parse(jsonMatch[0]);
                
                // Validate the required structure
                if (!parsedJson.questions || !Array.isArray(parsedJson.questions)) {
                    throw new Error("Invalid JSON structure: missing questions array");
                }
                
            const parsedPdf = await prisma.questionParsed.create({
                data: {
                    data:parsedJson,
                    uploaderId,
                    subject : body.subject,
                    level:body.level

                }
            });
            console.error("Raw response:", responseText);
            console.log("Parsed value: ",JSON.parse(jsonMatch[0]));
            res.status(201).json({
                message: "PDF uploaded successfully!",
                pdf,
                parsedPdf
            });
            console.log({ message: "PDF uploaded successfully!", pdf });

        } catch (error) {
            
            console.error(error);
            res.status(500).json({ message: "Error uploading PDF" });
        }
    }
);

router.get("/pdf/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const pdf = await prisma.questionPdf.findUnique({
            where: { id },
        });
        if (!pdf) {
            return res.status(404).json({ message: "PDF not found" });
        }
        res.setHeader("Content-Type", pdf.contentType); // Ensures it's recognized as a PDF
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${pdf.name}"`
        ); // Prompts download
        res.send(pdf.data); // Send the binary data
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching PDF" });
    }
});

router.get("/pdfs", async (req, res) => {
    try {
        const pdfs = await prisma.questionPdf.findMany({
            select: { id: true, name: true, createdAt: true,subject:true,level:true },
        });

        res.status(200).json(pdfs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching PDFs" });
    }
});

router.post("/signup", async (req, res) => {
    console.log("Reaching here");
    const body = req.body;
    try {
        const user = await prisma.eduSchema.create({
            data: {
                name: body.username,
                lastname: body.lastname,
                email: body.email,
                password: body.password,
            },
        });
        const userId = user.id;
        const token = jwt.sign({ userId: userId }, JWT_PASSWORD);
        res.cookie("token", token, { httpOnly: true });
        res.cookie("userType", "edu");
        res.json({ message: "signup successful !" });
    } catch (e) {
        console.log("Got the error: ", e);
        return res.status(403).json({
            message: "Got error while signing up",
        });
    }
});
router.post("/signin", async (req, res) => {
    console.log("Reaching here");
    const body = req.body;
    try {
        const founduser = await prisma.eduSchema.findFirst({
            where: {
                email: body.email,
                password: body.password,
            },
        });
        console.log("Got the user: ", founduser);
        if (founduser) {
            const token = jwt.sign({ userId: founduser.id }, JWT_PASSWORD);
            res.cookie("token", token, { httpOnly: true });
            res.cookie("userType", "edu");
            res.json({ message: "signup successful !" });
        } else {
            res.status(411).json({ message: "User not found !" });
        }
    } catch (e) {
        console.log("Got the error: ", e);
        return res.status(403).json({
            message: "Got error while signing in",
        });
    }
});

module.exports = router;
