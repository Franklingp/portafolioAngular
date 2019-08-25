'use strict'

// Modulo de configuracion del backend

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Importacion de rutas
const userRoutes = require('./routes/user.routes');
const proyectRoutes = require('./routes/proyect.routes');


//Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.use('/api/user', userRoutes);
app.use('/api/proyect', proyectRoutes);

//Exportar
module.exports = app;