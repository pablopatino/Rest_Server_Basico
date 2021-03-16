const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, postUser, putUser, patchUser, deleteUser } = require('../controllers/user');
const { validarRol, emailExiste, existeUsuarioxId } = require('../helpers/db_validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/',getUsuarios);

router.post( '/', [
    check('nombre','El Nombre es necesario').not().isEmpty(),
    check('password','El Password es necesario y tiene que contener 6 letras').isLength({ min: 6 }),    
    check('correo','El correo es necesario').isEmail(),    
    check('correo').custom( emailExiste ),    
    /* check('rol','No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROLE']), */
    check('rol').custom( validarRol ),
    validarCampos
], postUser );

router.put('/:userId',[
    check('userId', 'No es un ID valido').isMongoId(),
    check('userId').custom( existeUsuarioxId ),
    check('rol').custom( validarRol ),
    validarCampos
], putUser );

router.patch('/', patchUser );

router.delete('/:userId',[
    check('userId', 'No es un ID valido').isMongoId(),
    check('userId').custom( existeUsuarioxId ),
    validarCampos
] ,deleteUser );


module.exports = router;