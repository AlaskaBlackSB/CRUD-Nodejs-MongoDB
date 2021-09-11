const Role = require('../models/rol');
const Usuario = require('../models/Usuario');

/* 
    Funcion que recibe el rol y lo busca en la BD, si no lo encuentra
    manda un error.
*/
const validarRole = async ( rol = '' ) => {
    const existeRol = await Role.findOne( { rol } );
    if ( !existeRol ) {
        throw new Error( `El rol ${ rol } no esta registrado en la BD.` );
    }
}

const existeCorreo = async ( correo = '' ) => {
    const existeEmail = await Usuario.findOne( { correo } );
    if ( existeEmail ) {
        throw new Error( `El correo ${correo} ya está registrado.` );
    }
}

const existeUsuarioPorId = async ( id = '' ) => {
    //comprueba que sea un id de mongo válido
    if ( id.match(/^[0-9a-fA-F]{24}$/) ) {
        //Comprueba que el id exista en la BD
        const existeUsuario = await Usuario.findById( id ).exec();
        if ( !existeUsuario ) {
            throw new Error(`El id ${ id } no existe.`);
        }
    } else {
        throw new Error(`${ id } no es un ID válido.`);
    }
}

module.exports = {
    validarRole,
    existeCorreo,
    existeUsuarioPorId,
}