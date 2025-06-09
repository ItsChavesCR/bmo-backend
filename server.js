const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const chatRoutes = require('./routes/chat');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/chat', chatRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado a MongoDB Atlas');
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('❌ Error conectando a MongoDB', err));
