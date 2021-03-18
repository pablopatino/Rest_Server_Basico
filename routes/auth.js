const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSigin } = require('../controllers/auth.controller');

const { validarRol, emailExiste, existeUsuarioxId } = require('../helpers/db_validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El correo es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token', 'El id token es necesario').not().isEmpty(),
    
    validarCampos
], googleSigin);

module.exports = router;