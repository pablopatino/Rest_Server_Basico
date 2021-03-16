
const { Schema, model } = require('mongoose')

const UserScheme = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROL', 'USER_ROL']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    
});

UserScheme.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model( 'Usuarios', UserScheme );