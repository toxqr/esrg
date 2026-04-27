import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY in .env" });
    }

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array" });
    }

    const conversationText = messages
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n");

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions: "You are a helpful, friendly AI chatbot. Keep answers clear and useful.",
      input: conversationText
    });

    res.json({ reply: response.output_text || "Sorry, I could not generate a response." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chatbot failed. Check your server console." });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`AI chatbot running at http://localhost:${process.env.PORT || 3000}`);
});
