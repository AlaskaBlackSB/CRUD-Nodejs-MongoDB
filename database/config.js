const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        //Conexion a la bd
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Base datos Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicial la base de datos.');
    }

}

module.exports = {
    dbConnection,
}