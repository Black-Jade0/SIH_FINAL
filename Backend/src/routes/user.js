const express = require("express");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const jwt=require("jsonwebtoken")
const router=express.Router()
const prisma=new PrismaClient();
const { authMiddleware } =require('../middleware');
const { JWT_PASSWORD } = require("../config");
const fs = require('fs').promises;
const path = require('path');
const multer = require("multer");
const { cleanupTempFile, cleanupTempDirectory } = require('../utility/cleanupfunction');
const { processMultipleDocuments } = require('../utility/aiupload');
const rateLimit = require('express-rate-limit');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'));
        }
    }
});
const tempDir = path.join(__dirname, 'temp');
fs.mkdir(tempDir, { recursive: true }).catch(console.error);
const questionDir = path.join(__dirname,'questions');
fs.mkdir(questionDir,{recursive:true}).catch(console.error);

//test route for checking what gemini return after sending it a complex document containing different paragraph and mode question
const tempquestionDir = path.join(__dirname,"tempquestion");
fs.mkdir(tempquestionDir,{recursive:true}).catch(console.error);
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.post("/uploadtempquestion", upload.single("pdf"), async (req, res) => {
    const tempquestionFiles = [];
    let tempquestionFilePath = null;

    try{
        await cleanupTempDirectory(tempquestionDir);
        if (!req.file) {
            throw new Error("No file uploaded");
        }
        const { originalname, buffer, mimetype } = req.file;
        // const body = JSON.parse(req.body.infoFile);
        // Create temp file path with timestamp
        tempquestionFilePath = path.join(tempquestionDir, `${Date.now()}-${originalname}`);
        await fs.writeFile(tempquestionFilePath, buffer);
        // Initialize GoogleGenerativeAI with your API_KEY.
        const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
        const model = genAI.getGenerativeModel({
            // Choose a Gemini model.
            model: "gemini-1.5-flash",
          });
        // Generate content using text and the URI reference for the uploaded file.
        const result = await model.generateContent([
            {
            fileData: {
                mimeType: mimetype,
                fileUri: tempquestionFilePath,
            },
            },
            { text: `Please convert the questions in this file into a structured JSON format. Each question should be represented as a detailed object with the following attributes:

        Base attributes (required for all questions):

        Unique ID and serial number (e.g., Q1, Q2)
        Question type (multiple choice, fill in blank, true/false, passage-based, etc.)
        Question text
        Marks/points allocated
        Difficulty level (easy/medium/hard)

        Type-specific attributes:

        For passage-based questions:

        Include the full passage text
        Passage title (if available)
        Source attribution (if available)

        For multiple choice questions:

        Array of options with ID and text
        Correct answer reference


        For other question types:

        Relevant specific attributes


        Optional attributes:

        Topic tags
        Specific instructions
        Time recommended (if applicable)


        Include metadata about the entire question set:

        Total number of questions
        Total marks
        Overall time limit
        General instructions
        Subject/topic information


        Please preserve any formatting, mathematical equations, or special characters in the question text. The output should be valid JSON that can be parsed programmatically.` },
        ]);  
        const responseText = result.response.text();
        try {
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error("No JSON object found in response");
            }
            return JSON.parse(jsonMatch[0]);
        } catch (parseError) {
            console.error("Raw response:", responseText);
            console.error("Error parsing response:", parseError);
            throw new Error("Failed to parse Gemini response");
        }

    }catch(error){
        console.log("Got the following error while uploading and parsing file: ",error)
        res.status(400).json({message:error})
    }
});

router.post("/uploadforevalv1", upload.single("pdf"), async (req, res) => {
    const tempFiles = [];
    const fileUris = [];
    let tempFilePath = null;
    let questionFilePath = null;

    try {
        // First clean up old files
        await cleanupTempDirectory(tempDir);
        await cleanupTempDirectory(questionDir);

        if (!req.file) {
            throw new Error("No file uploaded");
        }

        const { originalname, buffer } = req.file;
        const body = JSON.parse(req.body.infoFile);
        
        // Create temp file path with timestamp
        tempFilePath = path.join(tempDir, `${Date.now()}-${originalname}`);
        await fs.writeFile(tempFilePath, buffer);
        tempFiles.push(tempFilePath);
        
        const questionFile = await prisma.questionPdf.findFirst({
            where: {
                subject: body.subject,
                level: body.level
            }
        });

        if (!questionFile) {
            throw new Error("Question file not found for given subject and level");
        }

        questionFilePath = path.join(questionDir, `${Date.now()}-${questionFile.name}`);
        await fs.writeFile(questionFilePath, questionFile.data);
        tempFiles.push(questionFilePath);

        fileUris.push(tempFilePath);
        fileUris.push(questionFilePath);

        const result = await processMultipleDocuments(fileUris);
        
        res.json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error('Error in upload-multiple:', error);
        
        const statusCode = error.status === 429 ? 429 : 
                          error.message.includes('model is overloaded') ? 503 : 500;
        
        res.status(statusCode).json({
            success: false,
            error: error.message || 'An unexpected error occurred'
        });

    } finally {
        // Clean up all temporary files
        for (const filePath of tempFiles) {
            try {
                await cleanupTempFile(filePath);
            } catch (cleanupError) {
                console.error(`Failed to cleanup file ${filePath}:`, cleanupError);
            }
        }
    }
});

// Set up scheduled cleanup
setInterval(async () => {
    try {
        console.log('Running scheduled cleanup...');
        await cleanupTempDirectory(tempDir);
        await cleanupTempDirectory(questionDir);
        console.log('Scheduled cleanup completed');
    } catch (error) {
        console.error('Scheduled cleanup failed:', error);
    }
}, 60 * 60 * 1000); // Run every hour


router.post('/signup', async(req,res)=>{
    console.log("Reaching here")
  const body= req.body;
  try{
      const user=await prisma.userSchema.create({
          data:{
              name:body.username,
              lastname:body.lastname,
              email:body.email,
              password:body.password,
          }
      });
      const userId=user.id;
      const token=jwt.sign(userId,JWT_PASSWORD);
      res.cookie("token", token);
      res.json({message:"signup successful !"})
  }catch(e){
      console.log("Got the error: ",e);
      return res.status(403).json({
          message:"Got error while signing up"
      });
  }
})
router.post('/signin',async (req,res)=>{
    console.log("Reaching here")
  const body=req.body;
  try{
      const founduser=await prisma.userSchema.findFirst({
          where:{
              email:body.email,
              password:body.password
          }
      })
      console.log("Got the user: ",founduser)
      if(founduser){
        const token = jwt.sign({userId: founduser.id}, JWT_PASSWORD);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });
        console.log('Response headers:', res.getHeaders()); // Add this line
        res.json({message: "signin successful!"});
      }else{
        res.status(411).json({message:"User not found !"})
      }
  }catch(e){
      console.log("Got the error: ",e);
      return res.status(403).json({
          message:"Got error while signing in"
      });
  }
})
router.post('/profilesetup', authMiddleware ,async (req,res)=>{

      const body = req.body;
      const userId = req.userId
      //console.log("userId rec. ",userId)
      try{
        const userdetail = await prisma.userDetail.upsert({
            where:{userId},
            update:{
                userId:userId,
              lat:body.lat,
              long:body.long,
              fieldofinterest:body.fieldofinterest,
              gender:body.gender,
              age:Number(body.age),
              phone:Number(body.phone),
              state:body.state,
              currentstd:body.currentstd,
              socialmedia: { instagram: body.instagram, twitter: body.twitter, linkedin: body.linkedin }
            },
          create:{
              userId:userId,
              lat:body.lat,
              long:body.long,
              fieldofinterest:body.fieldofinterest,
              gender:body.gender,
              age:Number(body.age),
              phone:Number(body.phone),
              state:body.state,
              currentstd:body.currentstd,
              socialmedia: { instagram: body.instagram, twitter: body.twitter, linkedin: body.linkedin }
          }
        })
        res.status(200).json({message:"Profile created successfully"})
      }catch(error){
        console.log("Got the error: ",error);
        res.status(411).json({error:"Failed to setup the profile"});
      }
})

module.exports = router;
