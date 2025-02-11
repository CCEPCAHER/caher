// app.js o server.js
import express from 'express';
import cors from 'cors';
import webhookRoutes from './routes/webhook.js';

const app = express();
const port = process.env.PORT || 8080;

// Configurar CORS (ajusta el origen según corresponda)
const corsOptions = {
  origin: 'https://ccepcaher.github.io',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Middleware para procesar JSON
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('Servidor escuchando!');
});

// Usa la ruta del webhook
app.use(webhookRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
