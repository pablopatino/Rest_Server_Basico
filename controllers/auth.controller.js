const { response } = require("express");
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario.model');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify} = require("../helpers/google-verify");


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

const googleSigin = async ( req, res = response ) => {
    const { id_token } = req.body;
    
    
    
    try {
        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            
            const data = {
                nombre,
                correo,
                password: 'p43535',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //Generar el JWT

        const token = await generarJWT( usuario.id );

        res.json({
            msg: 'Google sigin correcto',
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Token de google no es valido'
        })
    }


}


module.exports = {
    login,
    googleSigin
}