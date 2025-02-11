// routes/webhook.js
import express from 'express';
const router = express.Router();

router.post('/webhook', (req, res) => {
  const data = req.body;

  if (data.type === 'DEPLOY') {
    console.log('Evento de despliegue recibido:', data);
    return res.status(200).send('Despliegue registrado');
  }

  // Aquí podrías agregar la lógica para procesar pedidos u otros tipos de eventos
  console.log('Otro evento recibido:', data);
  res.status(200).send('Evento recibido');
});

export default router;
