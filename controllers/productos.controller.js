const { response } = require("express")
const { Producto } = require("../models")


const getProductos = async ( req, res= response ) => {

    const [ total, monstrar ] = await Promise.all([
        await Producto.countDocuments({ estado: true }),
        await Producto.find({ estado: true })
                        .populate('usuario', 'nombre')
                        .populate('categoria', 'nombre')
    ]);

    res.json({
        msg:'GetProductos',
        total,
        monstrar
    })

}


const crearProducto = async (req, res = response) => {
 
    const { nombre, descripcion, precio, categoria } = req.body
    console.log(req.body)

    const existeProducto = await Producto.findOne({ nombre })
    
    if ( existeProducto ) {
        return res.status(401).json({
            msg: 'El producto ya existe'
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id,
        categoria,
        descripcion,
        precio
    }

    const newProducto = new Producto( data );

    newProducto.save();

    res.json({
        msg: 'Producto Creado',
        newProducto
    })

}

const getProductosId = async( req, res= response ) => {

    const { id } = req.params

    const producto = await Producto.findById( id )
                                    .populate('usuario', 'nombre')
                                    .populate('categoria', 'nombre')

    res.json({
        msg: 'Funciona el Get x id asdasdasdas',
        producto
    })

}

const deleteProductos = async( req, res= response ) => {

    const { id } = req.params

    await Producto.findByIdAndUpdate(id, { estado: false })

    res.json({
        msg: 'Producto eliminado correctamente'
    })

}

const actualizarProductos = async(req, res = reponse) => {

    const { id } = req.params
    const {nombre, descripcion, precio} = req.body 

    const data = {
        nombre,
        descripcion,
        precio
    }

    await Producto.findByIdAndUpdate( id, data )

    res.json({
        msg:'Actualizo correctamente'
    })
}


module.exports = {
    getProductos,
    crearProducto,
    getProductosId,
    deleteProductos,
    actualizarProductos
}