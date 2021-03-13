const { Router } = require('express');
const { getUsuarios, postUser, putUser, patchUser, deleteUser } = require('../controllers/user');

const router = Router();


router.get('/', getUsuarios);

router.post('/', postUser );

router.put('/:userId', putUser );

router.patch('/', patchUser );

router.delete('/', deleteUser );


module.exports = router;