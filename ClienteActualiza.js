// Importamos el módulo 'request' para realizar solicitudes HTTP
const request = require('request');

// Configuramos las opciones para la solicitud PUT
const options = {
    method: 'PUT', // Método HTTP PUT
    url: 'http://localhost:3030/clienteActualiza', // URL de destino
    json: { // Datos en formato JSON que se enviarán en la solicitud
        nombre: "kakaroto",
        poder: 0,
        defensa: 400,
        vivo: false,
    }
};

// Realizamos la solicitud PUT utilizando las opciones configuradas
request(options, (error, response, body) => {
    if (error) {
        console.error(error); // Si hay un error en la solicitud, lo mostramos en la consola
        return; // Salimos de la función en caso de error
    }

    // Si la solicitud se completa con éxito, mostramos el código de estado de la respuesta y el cuerpo de la respuesta
    console.log("Respuesta del servidor:", response.statusCode);
    console.log("Cuerpo de la respuesta:", body);
});
