const express = require('express');
const connection = require('./db');
const app = express();
const PORT = 3018;

app.use(express.json());

app.get('/calculateGrade', (req, res) => {
  const query = `
    SELECT 
      id,
      first_name,
      last_name,
      subject,
      grade1,
      grade2,
      ROUND((grade1 + grade2) / 2, 2) AS finalGrade
    FROM Students
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al calcular las notas finales:', err.message);
      return res.status(500).send('Error al calcular las notas finales');
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron estudiantes' });
    }

    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
