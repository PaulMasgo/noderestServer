const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const Usuario = require('../models/usuario')
const _ = require('underscore')

app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);


    let limite = req.query.limite || 5;
    limite = Number(limite);
    //---------------Muestra solo los campos mencionados
    Usuario.find({ estado: true }, 'nombre email ')
        .skip(desde)
        .limit(limite)
        .exec((err, usuariosDB) => {
            if (err) {
                return res.status(400).json({ ok: false, err })
            };
            Usuario.count({}, (err, contar) => {
                res.json({ ok: true, usuarios: usuariosDB, conteo: contar });
            });

        });
});

app.post('/usuario', function(req, res) {
    let contenido = req.body;
    let usuario = new Usuario({
        nombre: contenido.nombre,
        email: contenido.email,
        password: bcrypt.hashSync(contenido.password, 10),
        role: contenido.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

});

app.put('/usuario/:id', function(req, res) {

    let identificador = req.params.id;

    //Solo los campos dentro del aaray podran ser actualizados
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findOneAndUpdate(identificador, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    //borrado del registro
    // Usuario.findByIdAndRemove(id, (err, userDelete) => {
    //     if (err) { return res.status(400).json({ ok: false, err }) }
    //     res.json({ ok: true, userDelete })
    // });

    //Actulizar estado del registro 

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, userDelete) => {
        if (err) { return res.status(400).json({ ok: false, err }) };
        res.json({ ok: true, userDelete })
    })

});

module.exports = app;