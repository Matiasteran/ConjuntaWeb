const mysql = require('mysql2');

// Conexión a MySQL proporcionada por Clever Cloud
const connectionURI = 'mysql://utoyqieuqvce4tua:OqTJFQWHhe9FNxgfYdni@bshfoyw8lhufkszxhddq-mysql.services.clever-cloud.com:3306/bshfoyw8lhufkszxhddq';

const connection = mysql.createPool({
  uri: connectionURI,
  connectionLimit: 15,
});

module.exports = connection;