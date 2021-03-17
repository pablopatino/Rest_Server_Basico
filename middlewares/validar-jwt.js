const { response } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario.model')

const validarJWT = async( req, res = response , next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY)

        const usuario = await Usuario.findById( uid )

        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no valido --- Usuario no existe'
            });
        }

        //Verificar que el usuario este en estado: true
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no valido --- estado: false'
            });
        }

        req.usuario = usuario

        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}