const path  = require('path')
const fs = require('fs')

const { response, json } = require("express");

const { fileUplo } = require('../helpers')
const { Usuario, Producto }  = require('../models')


const cargarArchivos = async( req, res = response ) => {
 
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
      res.status(400).json({msg: 'No files were uploaded.'});
      return;
    }

    try {
      
      const pathArhcivo = await fileUplo( req.files, undefined ) ;

    } catch (error) {
      
      console.log(error)
    }

    

   /*  res.json({
      msg: pathArhcivo
    }) */

}


const cargarImagenUsuario = async( req, res = response ) => {

  const { id, coleccion } = req.params

  let modelo;

  switch ( coleccion ) {
    case 'users':
      
    modelo = await Usuario.findById( id )
    if (!modelo) {
      return res.status(400).json({ msg: 'Usuario no existe' })
    }
    break;

  
    case 'productos':
      modelo = await Producto.findById( id )
      if (!modelo) {
        return res.status(400).json({ msg: 'Productos no existe' })
      }

    break;

    default:
      return res.status(500).json({ msg: 'Se olvido validar' })
  }

  if ( modelo.img ) {
    
    const pathImg = path.join(modelo.img)
    if ( fs.existsSync( pathImg )) {
        fs.unlinkSync( pathImg );
    }

  }

  const pathArhcivo = await fileUplo( req.files, undefined, coleccion ) ;
  modelo.img = pathArhcivo

  await modelo.save();


  res.json({
    id, coleccion, modelo
  })

}

const monstrarImagen = async( req, res ) => {

  const { id, coleccion } = req.params

  let modelo;

  switch ( coleccion ) {
    case 'users':
      
    modelo = await Usuario.findById( id )
    if (!modelo) {
      return res.status(400).json({ msg: 'Usuario no existe' })
    }
    break;

  
    case 'productos':
      modelo = await Producto.findById( id )
      if (!modelo) {
        return res.status(400).json({ msg: 'Productos no existe' })
      }

    break;

    default:
      return res.status(500).json({ msg: 'Se olvido validar' })
  }

  if ( modelo.img ) {    
    const pathImg = path.join(modelo.img)
    if ( fs.existsSync( pathImg )) {
       return res.sendFile( pathImg )
    }  
  } 

  const pathImgStatic = path.join(__dirname, '../assets', 'no-image.jpg')
  console.log(pathImgStatic)
  return res.sendFile( pathImgStatic )

}


module.exports = {
    cargarArchivos,
    cargarImagenUsuario,
    monstrarImagen
}