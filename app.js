
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://franklitocarranza:BgbVWF1iSe9krYhG@cluster0.ig61k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

import express from "express"
import cors from "cors"
const app  = express()
const port = 3000
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servidor escuchando!')
  })

  app.post('/ejemplo', (req, res) => {
    
    res.json('Datos recibidos')
    console.log(req.body)
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })