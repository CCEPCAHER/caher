import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080; // Usar el puerto dinámico de Railway

app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('Servidor escuchando!');
});

// Ruta de ejemplo para recibir datos via POST
app.post('/ejemplo', (req, res) => {
    res.json('Datos recibidos');
    console.log(req.body);
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
