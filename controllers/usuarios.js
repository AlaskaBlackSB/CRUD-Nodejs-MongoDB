const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');

const usuariosGet = async (req, res = response) => {

    //Recibe el limite y desde para mandar los usuarios
    let { limite = 5, desde = 0 } = req.query;
    
    //Query para mostrar todos los usuarios qu esten activos (estado:true)
    const query = { estado: true };

    //Comprueba que sea un número y que el numero sea mayor a 0
    if ( isNaN( limite ) || Number( limite ) < 1 ) {
        limite = 5;
    }else{

    }
    //Comprueba que sea un número y que el numero sea mayor a 0
    if ( isNaN( desde ) || Number( desde ) < 1 ) {
        desde = 0;
    }

    //Coleccion de promejas, las ejecuta de forma paralela
    const [ total, usuarios ] = await Promise.all( [ 
        Usuario.countDocuments( query ), //Devuelve el numero de usuarios
        Usuario.find( query )
            .skip( Number( desde ) )
            .limit( Number( limite ) ),
    ] );

    res.json( { total, usuarios } );
    
}

//Metodo post
const usuariosPost = async (req, res = response) => {
    
    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario( { nombre, correo, password, role } );
    
    //Crear hash de la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    //Guarda el usuario en la BD
    await usuario.save();

    res.json({
        usuario,
    });
    
}

const usuariosPut = async (req, res = response) => {
    
    
    const { id } = req.params; //Se lee del url ej: /api/usuario/10 donde 10 es el parametro
    const { _id, password, google, correo, ...resto } = req.body;

    if( password ){
        //Crear hash de la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    //Actualiza los datos de usuario
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( { usuario } );
    
}

const usuariosPatch = (req, res = response) => {
    
    res.json({
        msg: 'PATCH API - Controlador',
    });
    
}

const usuariosDelete = async (req, res = response) => {
    
    const { id } = req.params;

    //Borrar el registro físicamente
    //const usuario = await Usuario.findByIdAndDelete( id );

    //Se recomienda no borrar el registro y solo cambiar el estado del usuario a false
    //indicando que el usuario ahora esta inactivo
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false} );

    res.json({
        id,
        usuario
    });
    
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}