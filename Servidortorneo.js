// Importamos el módulo 'express' y el módulo de conexión ('conexion.js')
const express = require('express');
const conexion = require('./conexion.js');

const app = express();

// Definimos una ruta que responde a solicitudes GET para ver los personajes
app.get('/verPersonajes', (req, res) => {
    
    const sql = 'SELECT * FROM personajes';

    // Realizamos la consulta a la base de datos
    conexion.query(sql, function (err, results) {
        if (err) {
            console.error(err);
            return;
        }

        // Respondemos con los resultados en formato JSON
        res.json(results);
    });

});

// Iniciamos el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('En escucha en el puerto 3000');
});
