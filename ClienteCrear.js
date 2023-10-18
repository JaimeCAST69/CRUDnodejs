// Importamos el módulo de conexión previamente configurado
const conexión = require('./conexion'); 

// Objeto que representa los datos del nuevo participante
const nuevoParticipante = {
  nombre: 'Kakaroto',
  poder: 300,
  defensa: 100,
  vivo: true
};

// Consulta SQL para insertar un nuevo participante en la tabla 'personajes'
const sql = 'INSERT INTO personajes (nombre, poder, defensa, vivo) VALUES (?, ?, ?, ?)';
const values = [nuevoParticipante.nombre, nuevoParticipante.poder, nuevoParticipante.defensa, nuevoParticipante.vivo];

// Ejecutamos la consulta utilizando la conexión a la base de datos
conexión.query(sql, values, (err, result) => {
  if (err) {
    console.error('Error en la consulta:', err);
    throw err;
  }
  console.log('Nuevo participante insertado con ID:', result.insertId);

  // Cerramos la conexión a la base de datos una vez completada la consulta
  conexión.end((err) => {
    if (err) {
      console.error('Error al cerrar la conexión:', err);
      throw err;
    }
    console.log('Conexión a la base de datos cerrada');
  });
});
