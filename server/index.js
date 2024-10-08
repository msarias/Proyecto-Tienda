const express = require('express');
const routes = require('./routes');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');

//Crear el server
const app = express();

//Configurar MongoDB
const connectDB = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/restapis');
        console.log('Conexión exitosa a MongoDB');
    }
    catch(error){
        console.error('Error al conectar', error);
    }
};

//Conectar MongoDB
connectDB();

//Habilitar BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Agregar las rutas
app.use('/', routes());

//Puerto del servidor
app.listen(3000);