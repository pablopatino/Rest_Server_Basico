const { Schema, model } = require('mongoose')

const ProductoaSchema = Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    //Guardar con un Usuario
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion:{
        type: String,
    },
    disponible:{
        type:Boolean,
        default: true
    },
    img:{
        type: String
    }

});

ProductoaSchema.methods.toJSON = function(){
    const { __v, _id, estado, ...producto } = this.toObject();
    return producto
}

module.exports = model( 'Producto', ProductoaSchema );