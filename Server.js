import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

// Configurar CORS para permitir solicitudes desde tu dominio
const corsOptions = {
  origin: 'https://ccepcaher.github.io/caher/', // Asegúrate de que coincida exactamente con el origen de tu sitio
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

// Rutas de tu servidor
app.get('/', (req, res) => {
  res.send('Servidor escuchando!');
});

app.post('/webhook', (req, res) => {
  console.log('Webhook recibido:', req.body);
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
