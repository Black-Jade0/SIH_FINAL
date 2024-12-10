const express = require("express");
require('dotenv').config();
const { createApi } = require("unsplash-js");
const { CohereClient } = require('cohere-ai');
const router = express.Router();

const cohere = new CohereClient({
    token: process.env.coheretoken,
  });
  
const serverApi = createApi({
    accessKey: process.env.unsplashaccesskey, 
});

router.post('/cohere', async (req,res)=>{
    const { message } = req.body;
    
    try{
    const response = await cohere.chat({
        message: message,
      });
      
      res.status(200).json(response);
    }catch(error){
        console.log("Got the error: ",error);
        res.status(411).json({error:"Error while making the api call"})
    }
    
})

// API endpoint for searching photos by keyword

router.get("/searchImage", async (req, res) => {
    const query = req.query.query;

    console.log(`Received search request with query: ${query}`);

    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    serverApi.search
        .getPhotos({ query, per_page: 1, orientation: "landscape" }) // Limit the search to 1 photo
        .then((result) => {
            if (result.errors) {
                res.status(500).json({ error: result.errors[0] });
            } else {
                const photo = result.response.results[0]; // Get the first photo
                if (!photo) {
                    res.status(404).json({ error: "No photos found" });
                } else {
                    res.json(photo); // Send the first photo to the client
                }
            }
        })
        .catch((err) => {
            res.status(500).json({ error: "Something went wrong" });
        });
});

module.exports = router;
