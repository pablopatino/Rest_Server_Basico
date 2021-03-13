const { response } = require('express');

const getUsuarios = ( req, res = response ) => {

    const params = req.query;
    
    res.status(200).json({
        ok: true,
        msg: 'Funcino el get'
    })
}

const postUser = ( req, res = responseres ) => {
    
    const { nombre, edad } = req.body

    res.status(200).json({
        ok: true,
        msg: 'Funcino el post',
    })
}

const putUser = ( req, res = response ) => {

    const { userId }  = req.params

    res.status(200).json({
        ok: true,
        msg: 'Funcino el put',
        userId
    })
}

const patchUser = ( req, res = response ) => {
    res.status(200).json({
        ok: true,
        msg: 'Funcino el delete'
    })
}

const deleteUser =  ( req, res = response ) => {
    res.status(403).json({
        ok: true,
        msg: 'Funcino el delete'
    })
}

module.exports = {
    getUsuarios,
    postUser,
    putUser,
    patchUser,
    deleteUser
}