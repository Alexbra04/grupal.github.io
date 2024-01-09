const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const tasksRoutes = require('./routes/tasks'); 

const app = express();
const port = 3000;

// Configuración de Handlebars
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.engine('.hbs', engine({
  extname: '.hbs' 
 }));  

app.set('view engine', 'hbs')

app.use(bodyParser.json());

//const db = mysql.createConnection({
app.use(myconnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'pruebaapi'
}));

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
//app.post('/usuarios', (req, res) => {
  //const nuevoUsuario = req.body;
  //db.query('INSERT INTO usuarios SET ?', nuevoUsuario, (err, result) => {
    //if (err) {
      //res.status(500).send(err);
    //} else {
      //res.status(201).send('Usuario agregado');
    //}
  //});
//});

// Actualizar un usuario por su cédula de identidad (ci)
//app.put('/usuarios/:ci', (req, res) => {
  //const ci = req.params.ci;
  //const datosActualizados = req.body;
  //db.query('UPDATE usuarios SET ? WHERE ci = ?', [datosActualizados, ci], (err, result) => {
    //if (err) {
      //res.status(500).send(err);
    //} else {
      //res.status(200).send('Usuario actualizado');
    //}
  //});
//});

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


app.use('/', tasksRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Servidor activo en el puerto ${port}`);
});