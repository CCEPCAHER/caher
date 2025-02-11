import express from 'express';
import cors from 'cors';
import fs from 'fs';
import ExcelJS from 'exceljs';

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: 'https://ccepcaher.github.io/caher/', // Tu frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

const excelFilePath = 'pedidos.xlsx';

// Función para agregar pedidos al Excel
async function agregarPedidoExcel(pedido) {
  let workbook;

  if (fs.existsSync(excelFilePath)) {
    workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);
  } else {
    workbook = new ExcelJS.Workbook();
  }

  let worksheet = workbook.getWorksheet('Pedidos');

  if (!worksheet) {
    worksheet = workbook.addWorksheet('Pedidos');
    worksheet.addRow(['Cliente', 'Producto', 'Cantidad', 'Fecha']);
  }

  worksheet.addRow([pedido.cliente, pedido.producto, pedido.cantidad, new Date().toLocaleString()]);

  await workbook.xlsx.writeFile(excelFilePath);
}

// Ruta webhook para recibir pedidos
app.post('/webhook', async (req, res) => {
  const pedido = req.body;

  if (!pedido.cliente || !pedido.producto || !pedido.cantidad) {
    return res.status(400).send('Datos incompletos');
  }

  try {
    await agregarPedidoExcel(pedido);
    console.log('Pedido guardado:', pedido);
    res.status(200).send('Pedido recibido y guardado en Excel');
  } catch (error) {
    console.error('Error guardando pedido:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
