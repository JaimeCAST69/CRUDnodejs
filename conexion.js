// Importamos el módulo 'mysql' para trabajar con MySQL desde Node.js
const mysql = require('mysql');

// Creamos una instancia de conexión a la base de datos con los detalles de conexión
const connection = mysql.createConnection({
  port: '4030',       
  host: '127.0.0.1',  
  user: 'root',       
  password: '',       
  database: 'bdtorneo',
});

// Establecemos la conexión a la base de datos
connection.connect(function(err) {
  if (err) {
    console.error(err); // Si hay un error durante la conexión, se muestra en la consola
    return; // Salimos del programa en caso de error
  }

  console.log('Conectado a la base de datos con éxito'); // Imprimimos un mensaje de éxito en la consola si la conexión tiene éxito
});

// Exportamos la conexión para que esté disponible en otros módulos
module.exports = connection;
