const express = require('express');
const connection = require('./db');
const app = express();
const PORT = 3001;
app.use(express.json());


//Marcos Actualizar
app.get('/Pintureframe', (req, res) => {
  connection.query('SELECT * FROM `frames`', (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta:', err.message);
      return res.status(500).send('Error al obtener las facturas');
    }
    res.json(results);
  });
});

app.put('/Pintureframe/Put/:id', (req, res) => {
  const { serialNumber } = req.params; 
  const { brand, model, material, dimensions, isNew, price } = req.body;

  const query = `
    UPDATE frames
    SET brand = ?, 
        model = ?, 
        material = ?, 
        dimensions = ?, 
        isNew = ?, 
        price = ?
    WHERE serialNumber = ?`;

  // Ejecutar la consulta
  connection.query(
    query, 
    [brand, model, material, dimensions, isNew, price, serialNumber], 
    (err, results) => {
      if (err) {
        console.error('Error al actualizar el marco:', err.message);
        return res.status(500).send('Error al actualizar el marco');
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Marco no encontrado');
      }
      res.json({ message: 'Marco actualizado exitosamente' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});