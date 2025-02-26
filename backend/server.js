require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Twilio Setup
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// MongoDB Setup
mongoose.connect(process.env.MONGO_URI);
const MessageSchema = new mongoose.Schema({ userMessage: String, botResponse: String });
const Message = mongoose.model("Message", MessageSchema);

// Sentiment Analysis Function
const detectSentiment = (message) => {
    if (/stress|anxiety|depressed|sad/i.test(message)) return "high";
    if (/tired|worried|nervous|angry/i.test(message)) return "moderate";
    return "low";
};

// API Route for Chatbot
app.post("/chat", async (req, res) => {
    const { message, phoneNumber } = req.body;
    const sentiment = detectSentiment(message);

    try {
        // Call Gemini API
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `The user is feeling ${sentiment} level distress. Respond with a helpful, calming message.\nUser: ${message}\nBot: `,
                            },
                        ],
                    },
                ],
            },
            { headers: { "Content-Type": "application/json" } }
        );

        const botResponse = response.data.candidates[0]?.content?.parts[0]?.text || "I'm here to help. How are you feeling?";

        // Store Chat in DB
        await Message.create({ userMessage: message, botResponse });

        // Send Emergency SMS if stress is HIGH
        if (sentiment === "high" && phoneNumber) {
            await twilioClient.messages.create({
                body: `🚨 Urgent: Your friend may need emotional support. Please check on them.`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber,
            });
        }

        res.json({ botResponse });
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to get response from Gemini API" });
    }
});

;

const JournalSchema = new mongoose.Schema({
    text: String,
    mood: Number,
    date: String,
});

const Journal = mongoose.model("Journal", JournalSchema);

app.post("/add-entry", async (req, res) => {
    try {
        const { text, mood } = req.body;
        const newEntry = new Journal({
            text,
            mood,
            date: new Date().toISOString().split("T")[0],
        });
        await newEntry.save();
        res.status(201).json({ message: "Entry saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving entry" });
    }
});

app.get("/get-entries", async (req, res) => {
    try {
        const entries = await Journal.find().sort({ date: 1 });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: "Error fetching entries" });
    }
});
// Define the schema
const MeditationPracticeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    benefits: { type: [String], required: true },
    videoUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  // Create a model from the schema
  const MeditationPractice = mongoose.model('MeditationPractice', MeditationPracticeSchema);

const videoUrlMapping = {
    "Alternate Nostril Breathing": "https://youtu.be/G8xIEzX40bA",
    "4-7-8 Breathing": "https://youtu.be/G8xIEzX40bA",
    "Loving-Kindness Meditation": "https://youtu.be/G8xIEzX40bA",
  };
 
  
  app.post('/medRecommend', async (req, res) => {
    console.log('Meditation Recommendation API hit');
    
    try {
      const moodDetected = req.body.mood;
      
      // Ensure mood is provided
      if (!moodDetected) {
        return res.status(400).json({ error: "Mood is required" });
      }
  
      // Format the request following Gemini API structure
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `You are an AI wellness guide. Given the following mood, generate 3 suitable pranayama or meditation practices. 
                The output should be structured in this JSON format:
  
                {
                  "practices": [
                    {
                      "name": "{Practice Name}",
                      "benefits": ["{Benefit 1}", "{Benefit 2}", "{Benefit 3}"],
                      "description": "{Detailed description of the practice}"
                    }
                  ]
                }
  
                **User Mood Provided**: ${moodDetected}
  
                Ensure each practice has a name, benefits, and a step-by-step description.
                Respond only with JSON.`
              }
            ]
          }
        ]
      };
  
      // Call Gemini API
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      );

      const lines = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      

      // Now use accumulatedDelta directly as a string
      const cleanedData = lines.replace(/```json|```/g, "").trim();      // Remove leading/trailing whitespace
      
      console.log(cleanedData)
      let parsedData;
      try {
        parsedData = JSON.parse(cleanedData);
      } catch (error) {
        console.error("Error parsing AI response:", error);
        return res.status(500).json({ error: "AI response parsing error" });
      }
  
      let updatedPractices = [];
  
      for (const practiceData of parsedData.practices) {
        let existingPractice = await MeditationPractice.findOne({ name: practiceData.name });
  
        const videoUrl = videoUrlMapping[practiceData.name] || "https://www.youtube.com/default_video";
  
        if (!existingPractice) {
          const practice = new MeditationPractice({
            name: practiceData.name,
            description: practiceData.description,
            benefits: practiceData.benefits,
            videoUrl: videoUrl,
          });
          await practice.save();
        } else {
          existingPractice.videoUrl = videoUrl;
          await existingPractice.save();
        }
  
        updatedPractices.push({
          name: practiceData.name,
          description: practiceData.description,
          benefits: practiceData.benefits,
          videoUrl: videoUrl,
        });
      }
  
      res.json({ updatedPractices });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error processing AI request" });
    }
  });
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
