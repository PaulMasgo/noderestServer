require('./config/config');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/usuario', function(req, res) {
    res.json('Obtener usuario');
});

app.post('/usuario', function(req, res) {
    let contenido = req.body;

    res.json({
        contenido
    });
});

app.put('/usuario/:id', function(req, res) {
    let ide = req.params.id;
    res.json({
        codigo: ide
    });
});

app.delete('/usuario', function(req, res) {
    res.json('Eliminar usuario');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto ', process.env.PORT);
});