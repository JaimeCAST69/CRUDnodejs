// Importamos los módulos necesarios
const express = require('express');
const conexion = require('./conexion.js'); // Supongo que este módulo configura la conexión a la base de datos
const jwt = require('jsonwebtoken');

const app = express();

const claveSecreta = 'ostia'; // Clave secreta para firmar y verificar tokens JWT
var tokenGenerado; // Variable para almacenar el token generado en /crearCredenciales

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Manejo de solicitudes POST para crear personajes
app.post('/crearPersonajes', (req, res) => {
    const datos = req.body;
    console.log("Datos recibidos en la solicitud POST:", datos);

    const sql = `INSERT INTO personajes (nombre, poder, defensa, vivo) VALUES (?, ?, ?, ?)`;
    const values = [datos.nombre, datos.poder, datos.defensa, datos.vivo];

    conexion.query(sql, values, function (err, results) {
        if (err) {
            console.error(err);
            res.status(500).send("Error al crear el usuario");
            return;
        }

        res.status(201).send("Usuario creado");
    });
});

// Manejo de solicitudes PUT para actualizar personajes
app.put('/clienteActualiza', (req, res) => {
    const datos = req.body;
    console.log("Datos recibidos en la solicitud PUT:", datos);

    const sql = `UPDATE personajes 
    SET poder = ?, 
    defensa = ?, 
    vivo = ?
    WHERE nombre = ?`;

    const values = [datos.poder, datos.defensa, datos.vivo, datos.nombre];

    conexion.query(sql, values, function (err, results) {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            res.status(500).send("Error al actualizar el usuario");
            return;
        }

        res.status(200).send("Actualización realizada");
    });
});

// Manejo de solicitudes POST para crear credenciales y generar un token JWT
app.post('/crearCredenciales', (req, res) => {
    const datos = req.body;
    const idC = datos.id;
    const nombreC = datos.nombre;
    const emailC = datos.email;

    // Generamos un token JWT con la información proporcionada
    const token = jwt.sign({
        id: idC,
        nombre: nombreC,
        email: emailC,
    }, claveSecreta);

    // Respondemos con el token generado en formato JSON
    res.json({
        tokenGen: token,
    });

    // Almacenamos el token generado en la variable 'tokenGenerado'
    tokenGenerado = token;
});

// Manejo de solicitudes DELETE para eliminar personajes (requiere autenticación con token)
app.delete('/eliminarPersonaje', (req, res) => {
    const datos = req.body;
    console.log(datos);

    if (datos.credencial === tokenGenerado) {
        const sql = `DELETE FROM personajes WHERE nombre = ?`;
        const values = [datos.nombre];

        conexion.query(sql, values, function(err, results) {
            if (err) {
                console.error(err);
                res.status(500).send("Error al eliminar el personaje");
                return;
            }
            res.status(200).send("Personaje eliminado");
        });
    } else {
        res.status(401).send("Credencial no válida");
    }
});

// Iniciamos el servidor en el puerto 3030
app.listen(3030, () => {
    console.log('Escuchando en puerto 3030');
});
