const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivos, cargarImagenUsuario, monstrarImagen } = require('../controllers/upload.controller');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivo } = require('../middlewares');


const router = Router();

router.post('/', cargarArchivos)

router.put('/:coleccion/:id',[
    check('id','El id debe de ser de mogno').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['users','productos'] ) ),
    validarArchivo,
    validarCampos
] ,cargarImagenUsuario)

router.get('/:coleccion/:id',[
    check('id','El id debe de ser de mogno').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['users','productos'] ) ),
    validarCampos
], monstrarImagen)

module.exports = router;