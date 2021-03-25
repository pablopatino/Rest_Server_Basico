const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');


class Server{

    constructor(){
        
         this.app = express();
         this.port = process.env.PORT

         this.path = {
             auth:       '/api/auth',
             categorias: '/api/categorias',
             users:      '/api/users',
             productos:  '/api/productos',
             buscar:      '/api/buscar',
             upload:       '/api/upload'
         }

         //Conexion a la base de datos
         this.conectarDB()

         //Middlewares
         this.middlewares();

         //Rutas
         this.router();
    }

    async conectarDB() {

        await dbConnection();
        
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //Parse del Body a JSON
        this.app.use( express.json() );

        this.app.use( express.static('public') );

        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    router() {

        this.app.use( this.path.auth , require('../routes/auth'))
        this.app.use( this.path.categorias , require('../routes/categorias'))
        this.app.use( this.path.users , require('../routes/user'))
        this.app.use( this.path.productos , require('../routes/productos'))
        this.app.use( this.path.buscar , require('../routes/buscar'))
        this.app.use( this.path.upload , require('../routes/upload'))


    }

    listen(){

        this.app.listen( this.port , () => {
            console.log('Servidor corriendo en el puerto', this.port)
        });

    }

}


module.exports = Server;