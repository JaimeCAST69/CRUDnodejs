// Importamos el módulo 'request' para realizar solicitudes HTTP
const request = require('request');

// Importamos el módulo 'jsonwebtoken' para trabajar con JWT (JSON Web Tokens)
const jwt = require('jsonwebtoken');

// Importamos la variable 'response' del módulo 'express' (que parece no estar siendo utilizada)
const { response } = require('express');

// Definimos una clave secreta para firmar y verificar JWT (debe ser una cadena segura)
const claveSecreta = 'ostia';

// Definimos una variable llamada 'tokenGenerado' (que aún no ha sido generado)
var tokenGenerado;

// Configuramos las opciones para la primera solicitud POST
const options = {
    method: 'POST',
    url: 'http://localhost:3030/crearCredenciales',
    body: JSON.stringify({
        id: "69",
        nombre: "Jaime",
        email: "jbmelones@gmail.com",
    }),
    headers: {
        'Content-Type': 'application/json',
    },
};

// Realizamos la primera solicitud POST para crear credenciales
request(options, (err, response, body) => {
    if (err) {
        console.error(err);
        return;
    }

    // Analizamos la respuesta JSON del servidor
    const respuesta = JSON.parse(body);
    console.log(respuesta);

    // Verificamos el token JWT recibido en la respuesta
    const decodedToken = jwt.verify(respuesta["tokenGen"], claveSecreta);

    // Extraemos la información del token
    const id = decodedToken.id;
    const nombre = decodedToken.nombre;
    const email = decodedToken.email;

    console.log(id, nombre, email);

    // Guardamos el token en la variable 'credencial'
    credencial = respuesta["tokenGen"];

    // Configuramos las opciones para la segunda solicitud DELETE
    const optionsD = {
        method: 'DELETE',
        url: 'http://localhost:3030/eliminarPersonaje',
        body: JSON.stringify({
            credencial: credencial,
            nombre: "kakaroto",
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Realizamos la segunda solicitud DELETE para eliminar un personaje
    request(optionsD, (err, response, body) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(body);
    });
});
