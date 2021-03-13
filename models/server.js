const express = require('express')
const cors = require('cors')

class Server{

    constructor(){
        
         this.app = express();
         this.port = process.env.PORT
         this.usersPath = '/api/users'

         //Middlewares
         this.middlewares();

         //Rutas
         this.router();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //Parse del Body a JSON
        this.app.use( express.json() );

        this.app.use( express.static('public') );

    }

    router() {

        this.app.use( this.usersPath , require('../routes/user'))

    }

    listen(){

        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en el puerto', this.port)
        });

    }

}


module.exports = Server;