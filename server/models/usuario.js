const mongoose = require('mongoose');
const uniqueVAlidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido '
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El campo es nesesario"]
    },
    email: {
        unique: true,
        type: String,
        required: [true, 'El correo es nesesario']
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let Objeto = user.toObject();
    delete Objeto.password;
    return Objeto;
}
usuarioSchema.plugin(uniqueVAlidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Usuario', usuarioSchema);