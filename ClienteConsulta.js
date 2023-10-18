// Importamos el módulo de conexión previamente configurado
const conexión = require('./conexion');

// Consulta SQL para seleccionar todos los registros de la tabla 'personajes'
const sql = 'SELECT * FROM personajes';

// Ejecutamos la consulta utilizando la conexión a la base de datos
conexión.query(sql, (err, results) => {
  if (err) {
    console.error('Error en la consulta:', err);
    throw err;
  }
  console.log('Resultado', results);

  // Cerramos la conexión a la base de datos una vez completada la consulta
  conexión.end((err) => {
    if (err) {
      console.error('Error al cerrar la conexión:', err);
      throw err;
    }
    console.log('Conexión a la base de datos cerrada');
  });
});
