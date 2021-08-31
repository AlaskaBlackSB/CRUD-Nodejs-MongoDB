const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server{
    
    constructor(){
        this.app = express();  //Crea el servidor
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a la base de datos
        this.conectarDB();

        //Middlwares
        this.middlwares();

        //Rutas de la aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlwares(){
        
        //Cors
        this.app.use( cors() )

        //Lectura y Parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') );


    }

    routes(){

        this.app.use( this.usuariosPath , require( '../routes/usuarios'));

    }

    listen(){

        this.app.listen( this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        });     

    }

}

module.exports = Server;