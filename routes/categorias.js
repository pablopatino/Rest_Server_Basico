const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerCategorias, categoriaporId, crearCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');

const { validarRol, emailExiste, existeUsuarioxId, existeCategoria } = require('../helpers/db_validators');
const { validarJWT, validarCampos, tieneRole } = require('../middlewares');


const router = Router();

//Obtener todas las categoria
router.get('/',[

    validarCampos
], obtenerCategorias);

//Obtener Categoria x Id
router.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], categoriaporId);


//Crear Categoria
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], crearCategoria);

//Actualizar
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoria ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria);


//Borrar
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoria ),
    tieneRole('ADMIN_ROLE'),
    validarCampos
], borrarCategoria);


module.exports = router;