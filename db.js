const mysql = require('mysql2');

// Conexión a MySQL proporcionada por Clever Cloud
const connectionURI = 'mysql://uglbkixcek6wynq5:K51uMlLuFC2RLgSk0fY0@bfbfl0wgtltgn4vaqzjs-mysql.services.clever-cloud.com:3306/bfbfl0wgtltgn4vaqzjs';

const connection = mysql.createPool({
  uri: connectionURI,
  connectionLimit: 15,
});

module.exports = connection;