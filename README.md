# 🤖 BMO-IA Backend

**BMO-IA** es un asistente virtual especializado en soporte técnico de computadoras, impulsado por inteligencia artificial mediante OpenAI y con persistencia de conversaciones en MongoDB Atlas.

## 📦 Tecnologías utilizadas

- Node.js + Express.js
- MongoDB Atlas (Mongoose)
- OpenAI API (GPT-4o)
- Render (despliegue backend)
- GitHub (repositorio del código)

---

## 🚀 Endpoints principales

| Método | Ruta             | Descripción                                 |
|--------|------------------|---------------------------------------------|
| POST   | `/chat/ask`      | Envía mensajes al asistente (IA)           |
| POST   | `/chat/save`     | Guarda un historial de conversación        |
| GET    | `/chat/all`      | Obtiene todos los historiales              |
| GET    | `/chat/page`     | Historial paginado (?page=1&limit=10)     |
| DELETE | `/chat/:id`      | Elimina un historial por su ID             |

---

## 🧠 Comportamiento de la IA

El asistente responde únicamente sobre temas técnicos relacionados con:

- Hardware (RAM, SSD, BIOS, etc.)
- Software (Windows, programas, controladores)
- Seguridad informática
- Redes (Wi-Fi, VPN, routers)
- Diagnóstico y mantenimiento

> Cualquier mensaje fuera de este ámbito será respondido con cortesía, pero redirigido al tema técnico.

---

## 📂 Estructura del proyecto

bmo-backend/
├── data/ # Base de datos simulada (opcional)
├── models/ # Esquemas de Mongoose
├── routes/ # Rutas del API
├── server.js # Punto de entrada principal
├── .env # Variables de entorno (no se sube)
├── package.json

## 📡 Despliegue

Este backend fue desplegado con:

🌐 Render (como servicio web)

☁️ MongoDB Atlas para base de datos remota
