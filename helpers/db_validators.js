const { response } = require('express');
const Roles = require('../models/rol.models');
const Usuario = require('../models/usuario.model');

const validarRol = async(rol = '') => {
    const existeRol = await Roles.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol }, no esta registrado en la Base de Datos`);
    }
}

const emailExiste = async( correo ) => {

    const existEmail = await Usuario.findOne({ correo })
    if ( existEmail ) {
        throw new Error( `El Correo: ${ correo } ya esta siendo utilizado` )
    }

}

const existeUsuarioxId = async( Id ) => {

    const existeUsuario = await Usuario.findById(Id)
    if ( !existeUsuario ) {
        throw new Error( `El Id: ${ Id } No existe` )
    }

}


module.exports = {
    validarRol,
    emailExiste,
    existeUsuarioxId
}