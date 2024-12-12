const { GoogleGenerativeAI } = require("@google/generative-ai");

class RateLimiter {
  constructor(maxRequests = 5, timeWindow = 60000) { // 14 requests per minute to be safe
      this.requests = [];
      this.maxRequests = maxRequests;
      this.timeWindow = timeWindow;
  }

  async waitForAvailableSlot() {
      const now = Date.now();
      this.requests = this.requests.filter(time => time > now - this.timeWindow);
      
      if (this.requests.length >= this.maxRequests) {
          const oldestRequest = this.requests[0];
          const waitTime = (oldestRequest + this.timeWindow) - now;
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return this.waitForAvailableSlot();
      }
      
      this.requests.push(now);
  }
}

const rateLimiter = new RateLimiter();

async function processMultipleDocuments(fileUris) {
  const maxRetries = 3;
  const baseDelay = 2000; // 2 seconds

  for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
          // Wait for an available rate limit slot
          await rateLimiter.waitForAvailableSlot();

          const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
          const model = genAI.getGenerativeModel({
              model: "gemini-1.5-flash",
              generationConfig: {
                  maxOutputTokens: 4096,
                  temperature: 0.4,
              },
          });

          const fileParts = await Promise.all(
              fileUris.map(async (uri, index) => {
                  try {
                      const fs = require("fs").promises;
                      const fileBuffer = await fs.readFile(uri);
                      const base64Data = fileBuffer.toString("base64");

                      return {
                          inlineData: {
                              mimeType: "application/pdf",
                              data: base64Data,
                          },
                      };
                  } catch (error) {
                      console.error(`Error processing file ${index + 1} (${uri}):`, error);
                      throw error;
                  }
              })
          );

          const prompt = `
              Analyze and compare the following documents. 
              First document is the answers and the second document 
              is the questions. Evaluate the answers based on the questions 
              and assign marks accordingly.

              Respond with a JSON object in this exact format:
              {
                  "TotalMarks":number
                  "ObtainedMarks": number,
                  "evaluation": {
                      "totalQuestions": number,
                      "questionsAnswered": number,
                      "detailedMarks": {
                          "question1": {
                              "awarded":"full/parial/none",
                              "right answer":string,
                              "obtained answer":string
                          },
                          "question2": {
                              "awarded":"full/parial/none",
                              "right answer":string,
                              "obtained answer":string
                          }
                      }
                  }
                "overAllAnalysis":"User's over all analysis based on the answers and marks, also give some suggestions
                and points on which they are strong and also on the points where they lack"
              }
          `;

          const parts = [{ text: prompt }, ...fileParts];
          const result = await model.generateContent(parts);
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

      } catch (error) {
          if (error.status === 429) {
              const delay = baseDelay * Math.pow(2, attempt); // exponential backoff
              console.log("Got the follwoing error: ",error)
              console.log(`Rate limited. Attempt ${attempt + 1}/${maxRetries}. Waiting ${delay}ms before retry...`);
              await new Promise(resolve => setTimeout(resolve, delay));
              
              if (attempt === maxRetries - 1) {
                  throw new Error("Maximum retry attempts reached. Please try again later.");
              }
              continue;
          }
          throw error;
      }
  }
}


module.exports = {
  processMultipleDocuments,
};
