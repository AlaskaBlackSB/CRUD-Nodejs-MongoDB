const express = require('express');
const cors = require('cors')

class Server{
    
    constructor(){
        this.app = express();  //Crea el servidor
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlwares
        this.middlwares();

        //Rutas de la aplicacion
        this.routes();
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