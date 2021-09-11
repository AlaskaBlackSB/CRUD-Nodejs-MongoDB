const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarRole, existeCorreo, existeUsuarioPorId } = require('../helpers/db-validator');

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
router.put('/:id', [        
    check( 'id' ).custom( existeUsuarioPorId ),
    check( 'role' ).custom( validarRole ), //Comprueba que el rol sea valido
    validarCampos,
],
usuariosPut );

//Peticion post
router.post('/', 
[
    //Arreglo de middlwares para validar los campos
    //si todas las validaciones pasan entonces se ejecuta la
    //funcion usuariosPost
    check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(), //Comprueba que el nombre tenga algo
    check( 'password', 'El password debe contener al menos 6 caracteres.' ).isLength( { min: 6} ), //Comprueba que el password tenga algo
    check( 'correo', 'El correo no es válido.' ).isEmail(), //Comprueba que el correo sea valido
    check( 'correo' ).custom( existeCorreo ), //Comprueba si el correo existe en la bd
    // check('role', 'No es un rol permitido.').isIn( ['ADMIN_ROLE', 'USER_ROLE']  ), //Comprueba que el rol sea valido
    check( 'role' ).custom( validarRole ), //Comprueba que el rol sea valido
    validarCampos,
]
, usuariosPost );

//Peticion delete
router.patch('/', usuariosPatch);

//Peticion delete
router.delete('/:id',[
    check( 'id' ).custom( existeUsuarioPorId ),
    validarCampos,
],usuariosDelete);


module.exports = router;