const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000; // Cambiado a 3000

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'pruebaapi' // Agrega la base de datos existente
});

// Conéctate a MySQL
db.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

// Obtener un usuario por su cédula de identidad (ci)
app.get('/usuarios/:ci', (req, res) => {
  const ci = req.params.ci;
  db.query('SELECT * FROM usuarios WHERE ci = ?', [ci], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  db.query('INSERT INTO usuarios SET ?', nuevoUsuario, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('Usuario agregado');
    }
  });
});

// Actualizar un usuario por su cédula de identidad (ci)
app.put('/usuarios/:ci', (req, res) => {
  const ci = req.params.ci;
  const datosActualizados = req.body;
  db.query('UPDATE usuarios SET ? WHERE ci = ?', [datosActualizados, ci], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Usuario actualizado');
    }
  });
});

// Eliminar un usuario por su cédula de identidad (ci)
app.delete('/usuarios/:ci', (req, res) => {
  const ci = req.params.ci;
  db.query('DELETE FROM usuarios WHERE ci = ?', [ci], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Usuario eliminado');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
