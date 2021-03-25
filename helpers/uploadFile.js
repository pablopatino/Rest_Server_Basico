const { v4: uuidv4 } = require('uuid')

const path = require('path');

const fileUplo = ( files, extencionesValidas = ['pdf','png','gif','jpg'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {

      const { archivo } = files;
      const nombreCortado = archivo.name.split('.');    
      const extension = nombreCortado[nombreCortado.length - 1];

      //Validar la extension
      if ( !extencionesValidas.includes( extension ) ) {
          return reject('La extension no es valida')
      }

      const nombreTemporal = uuidv4() + '.' + extension;
      const uploadPath = path.join(__dirname, '../uploads/', carpeta ,nombreTemporal ) ;
    
      archivo.mv(uploadPath, (err) => {
        if (err) {
          return reject( err )
        }
        
        resolve( uploadPath )
      }); 
    });

}

module.exports = {
  fileUplo
}