// Importamos el módulo 'request' para realizar solicitudes HTTP
const request = require('request');

// Definimos la URL a la que se realizará la solicitud GET
const url = 'http://localhost:3000/verPersonajes';

// Realizamos la solicitud GET a la URL especificada
request(url, (err, res, body) => {
    // Manejamos posibles errores durante la solicitud
    if (err) {
        console.log(err); // Mostramos el error en la consola
        return; // Salimos de la función en caso de error
    }

    // Si no hay errores, analizamos el cuerpo de la respuesta, que se espera en formato JSON
    const respuesta = JSON.parse(body);

    // Mostramos la respuesta en la consola
    console.log(respuesta);
});
