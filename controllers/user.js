const { response } = require('express');
const becrypt = require('bcryptjs')

const Usuario = require('../models/usuario.model');


const getUsuarios = async( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    
    res.status(200).json({
        total,
        usuarios
    });
}

const postUser = async ( req, res = response ) => {
    
    try {
         
        const { nombre, correo, password, rol } = req.body;
        const usuario = new Usuario({ nombre, correo, password, rol });

    
        //Encriptar contraseñas
        const salt = becrypt.genSaltSync();
        usuario.password = becrypt.hashSync( password, salt );

        await usuario.save();
            
        res.status(200).json({
            ok: true,
            msg: 'Usuario creado correctamente el post',
            usuario
        })
        
    } catch (error) {
        console.log(error)
    }

}

const putUser = async( req, res = response ) => {

    const { userId }  = req.params;
    const { _id ,password, google, correo, ...resto } = req.body;

    //TODO validar contra la base de datos
    if ( password ) {
        
        const salt = becrypt.genSaltSync();
        resto.password = becrypt.hashSync( password, salt );

    }

    const usuarioDB = await Usuario.findByIdAndUpdate( userId, resto );

    res.status(200).json({
        ok: true,
        msg: 'Usuario actualizado',
        usuarioDB
    })
}

const patchUser = ( req, res = response ) => {
    res.status(200).json({
        ok: true,
        msg: 'Funcino el delete'
    })
}

const deleteUser =  async( req, res = response ) => {

    const { userId } = req.params

    //Borrar fisicamente
    const usuario = await Usuario.findByIdAndUpdate( userId, { estado: false } );

    res.status(403).json({
        usuario
    })
}

module.exports = {
    getUsuarios,
    postUser,
    putUser,
    patchUser,
    deleteUser
}