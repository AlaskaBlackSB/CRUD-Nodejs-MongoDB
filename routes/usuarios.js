const { Router } = require('express');
const { 
        usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch, 
    } = require('../controllers/usuarios');

const router = Router();

//Peticion GET
router.get('/', usuariosGet );

//Peticion put
router.put('/:id', usuariosPut );

//Peticion post
router.post('/', usuariosPost );

//Peticion delete
router.patch('/', usuariosPatch);

//Peticion delete
router.delete('/', usuariosDelete);


module.exports = router;