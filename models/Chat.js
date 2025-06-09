const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: String,
  content: String,
});

const chatSchema = new mongoose.Schema({
  messages: [messageSchema],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', chatSchema);
