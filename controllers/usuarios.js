const { response } = require('express')

const usuariosGet = (req, res = response) => {
    
    //Asi se reciben los parametros de la url
    const { v1 , v2, nombre = 'No name' } = req.query;

    res.json({
        msg: 'GET API - Controlador',
        v1,
        v2,
        nombre,
    });
    
}

//Metodo post
const usuariosPost = (req, res = response) => {
    
    res.json({
        msg: 'POST API - Controlador',
    });
    
}

const usuariosPut = (req, res = response) => {
    
    const { id } = req.params; //Se lee del url ej: /api/usuario/10 donde 10 es el parametro

    res.json({
        msg: 'PUT API - Controlador',
        id
    });
    
}

const usuariosPatch = (req, res = response) => {
    
    res.json({
        msg: 'PATCH API - Controlador',
    });
    
}

const usuariosDelete = (req, res = response) => {
    
    res.json({
        msg: 'DELETE API - Controlador',
    });
    
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}