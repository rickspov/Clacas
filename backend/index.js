import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Respuestas predefinidas estilo Anie (puedes ampliar este JSON)
const respuestasAnie = [
  { keywords: ['triste', 'deprimido', 'desanimado'], response: 'Lo siento que te sientas así. Estoy aquí para escucharte y acompañarte.' },
  { keywords: ['ansiedad', 'nervioso', 'estresado'], response: 'Respira profundo. La ansiedad es difícil, pero juntos podemos hacer que pase.' },
  { keywords: ['feliz', 'contento', 'bien'], response: '¡Qué bueno escuchar eso! Me alegra que te sientas bien.' },
  { keywords: ['ayuda', 'no sé qué hacer', 'solo'], response: 'No estás solo, estoy aquí para acompañarte. ¿Quieres contarme más?' },
  { keywords: [], response: 'Estoy aquí para escucharte 🦋 Cuéntame lo que quieras.' }
];

// Busca una respuesta empática según palabras clave
function buscarRespuesta(mensaje) {
  const texto = mensaje.toLowerCase();
  for (const item of respuestasAnie) {
    for (const kw of item.keywords) {
      if (texto.includes(kw)) return item.response;
    }
  }
  // Respuesta por defecto
  return 'Estoy aquí para escucharte 🦋 Cuéntame lo que quieras.';
}

// Ruta de chat para Anie
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Falta el mensaje.' });

  const respuesta = buscarRespuesta(message);
  return res.json({ reply: respuesta });
});

app.listen(port, () => {
  console.log(`Backend placeholder de Anie escuchando en puerto ${port}`);
}); 