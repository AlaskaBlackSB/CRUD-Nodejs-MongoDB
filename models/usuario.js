const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligarotio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligarotio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligarotio'],
    },
    imagen: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    estado: { //Activo o inactivo
        type: String,
        default: true,
    },
    google: { //Para comprobar si el usuario fue autenticado con google
        type: Boolean,
        default: false,
    },

});

module.exports = model( 'Usuario', UsuarioSchema );