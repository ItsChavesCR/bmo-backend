const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const faqData = require("../data/faqData.json");
const axios = require('axios');
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Crear chat
router.post('/save', async (req, res) => {
  try {
    const { messages } = req.body;
    const chat = new Chat({ messages });
    await chat.save();
    res.status(201).json({ message: 'Chat guardado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al guardar el chat' });
  }
});

// Obtener todos los chats
router.get('/all', async (req, res) => {
  try {
    const chats = await Chat.find().sort({ date: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el historial' });
  }
});

// Eliminar un chat por ID
router.delete('/:id', async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Chat eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar' });
  }
});

// Paginación básica: /chat/page?page=1&limit=10
router.get('/page', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const chats = await Chat.find()
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Chat.countDocuments();
    res.json({ chats, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Error al paginar' });
  }
});

router.post("/ask", async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ message: "El formato de mensajes es inválido" });
  }

  // Convertimos los primeros 20 FAQs en ejemplos contextuales
  const faqExamples = faqData.slice(0, 20).flatMap((faq) => [
    { role: "user", content: faq.question },
    { role: "assistant", content: faq.answer }
  ]);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // o "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
    content: "Eres BMO, un asistente virtual de soporte técnico especializado en computadoras. Eres cordial, respondes saludos de forma amable, pero solo das respuestas técnicas o relacionadas con soporte informático. Si te hacen preguntas fuera de este tema, indícalo educadamente."
        },
        ...faqExamples,
        ...messages
      ],
      temperature: 0.5
    });

    const reply = completion.choices[0].message;
    res.json(reply);
  } catch (error) {
    console.error("❌ Error al contactar con OpenAI:", error?.message || error);
    res.status(500).json({ message: "Error al contactar con la IA" });
  }
});
module.exports = router;
