const { Schema, model } = require('mongoose')

const RolSchema = Schema({

    rol:{
        type: String,
        required: [true, 'El Rol es obligatorio']
    }

});

module.exports = model('Roles', RolSchema);