const { Router } = require('express');
const { check } = require('express-validator');

const { getProductos, crearProducto, getProductosId, deleteProductos, actualizarProductos } = require('../controllers/productos.controller');
const { validarCampos, validarJWT, tieneRole } = require('../middlewares');

const { existeProducto, validarRol} = require('../helpers/db_validators')


const router = Router();

router.get('/', getProductos )

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es requerido').not().notEmpty(),
    check('categoria', 'La categoria es obligatoria').not().notEmpty(),
    check('categoria', 'No es un ID valido').isMongoId(),
    validarCampos
] , crearProducto)

router.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
],getProductosId)

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    tieneRole('ADMIN_ROLE'),
    check('id').custom( existeProducto ),
    validarCampos
],deleteProductos )

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProducto ),
    check('nombre', 'El nombre es requerido').not().notEmpty(),
    validarCampos
], actualizarProductos)


module.exports = router