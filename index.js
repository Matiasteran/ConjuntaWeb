const express = require('express');
const connection = require('./db');
const app = express();
const PORT = 3001;
app.use(express.json());



/////////// TABLE: Avoices ///////////
app.get('/avoices', (req, res) => {
  connection.query('SELECT * FROM `Avoices`', (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta:', err.message);
      return res.status(500).send('Error al obtener las facturas');
    }
    res.json(results);
  });
});


app.post('/avoices', (req, res) => {
  const { id_avoice, id_client, id_sale, issue_date, total_amount, payment_status, notification_sent } = req.body;

  const query = `INSERT INTO \`Avoices\` (id_avoice, id_client, id_sale, issue_date, total_amount, payment_status, notification_sent) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, [id_avoice, id_client, id_sale, issue_date, total_amount, payment_status, notification_sent], (err, results) => {
    if (err) {
      console.error('Error al agregar la factura:', err.message);
      return res.status(500).send('Error al agregar la factura');
    }
    res.status(201).json({ message: 'Factura agregada exitosamente', id: results.insertId });
  });
});


app.put('/avoices/:id', (req, res) => {
  const { id } = req.params; 
  const { id_client, id_sale, issue_date, total_amount, payment_status, notification_sent } = req.body;

  const query = `UPDATE \`Avoices\` 
                 SET id_client = ?, id_sale = ?, issue_date = ?, total_amount = ?, payment_status = ?, notification_sent = ? 
                 WHERE id_avoice = ?`;

  connection.query(query, [id_client, id_sale, issue_date, total_amount, payment_status, notification_sent, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar la factura:', err.message);
      return res.status(500).send('Error al actualizar la factura');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Factura no encontrada');
    }
    res.json({ message: 'Factura actualizada exitosamente' });
  });
});


app.delete('/avoices/:id', (req, res) => {
  const { id } = req.params; 

  const query = `DELETE FROM \`Avoices\` WHERE id_avoice = ?`;

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al eliminar la factura:', err.message);
      return res.status(500).send('Error al eliminar la factura');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Factura no encontrada');
    }
    res.json({ message: 'Factura eliminada exitosamente' });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
