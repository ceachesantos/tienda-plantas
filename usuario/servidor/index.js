const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");

// Creamos el servidor
const app = express();

// Conectamos a la BD
conectarDB();
app.use(cors())

app.use(express.json());

app.use('/api/usuarios', require('./routes/usuario'));

app.listen(4002, () => {
    console.log('El servidor esta corriendo perfectamente')
})