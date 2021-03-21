const { response } = require("express");

const { Categoria } = require('../models')


const obtenerCategorias = async( req, res = response ) => {

    const { limit  } = req.query

    const [ total, categoria ] = await Promise.all([
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true })
                    .limit(Number(limit))
                    .populate('usuario')
    ]);

    res.json({
        total,
        categoria
    })

}

const categoriaporId = async ( req, res = response ) => {

    const { id } =  req.params
    
    const categoria =  await Categoria.findById( id )
                                        .populate('usuario', 'nombre')

    const { estado } = categoria

    if ( !estado ) {
       return res.status(401).json({
            msg: 'La caterogia esta en FALSE',
            
        })
    }

    res.json({
        categoria
    })

}

const crearCategoria = async( req, res = response ) => {

    const  nombre  = req.body.nombre.toUpperCase();

    const categoriaBd = await Categoria.findOne({ nombre })

    if ( categoriaBd ) {
        return res.status(401).json({
            msg: `La categoria: ${ nombre }, ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria =  new Categoria( data );

    await categoria.save();

    res.json({
        msg: `La categoria: ${ nombre }, ha sido creada`
    })

}

const actualizarCategoria = async ( req, res = response ) => {

    const { id } = req.params 
    const nombre = req.body.nombre.toUpperCase();

    const objeto = await Categoria.findByIdAndUpdate( id, { nombre } )

    res.json({
        msg: ' Categoria Actualizada Correctamente',
        objeto
    })

}

const borrarCategoria = async( req, res = response ) => {

    const { id } = req.params
    
    await Categoria.findByIdAndUpdate( id, { estado: false } )

    res.json({
        msg: ' La Categoria ha sido borrada'
    })

}




module.exports = {
    obtenerCategorias,
    categoriaporId,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}