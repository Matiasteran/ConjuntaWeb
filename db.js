const mysql = require('mysql2');

// Conexión a MySQL proporcionada por Clever Cloud
const connectionURI = 'mysql://ucgkbc2exn4ebhtx:YiZNahin9iE9NoPNMz1Y@bguwyoaiclntrgiqkzxl-mysql.services.clever-cloud.com:3306/bguwyoaiclntrgiqkzxl';

const connection = mysql.createPool({
  uri: connectionURI,
  connectionLimit: 15,
});

module.exports = connection;