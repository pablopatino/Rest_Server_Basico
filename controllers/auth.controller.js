const { response } = require("express");
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario.model');
const { generarJWT } = require("../helpers/generarJWT");


const login = async ( req, res = response ) => {

    const { correo, password } = req.body

    try {
    
        //Verificar si el Email existe en la BD
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password son incorrectos --- Email'
            })
        }

        //Si el usuario esta activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password son incorrectos --- Estado = False'
            })
        }

        //Verificar contraseña
        const valiPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !valiPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password son incorrectos --- Password'
            })
        }

        //Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            msg: 'Exito',
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.json({
            msg:'Hable con el administrador'
        })    
    }

}


module.exports = {
    login
}