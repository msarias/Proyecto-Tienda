const productos = require('../models/productos');
const Productos = require('../models/productos');
const multer = require('multer');

let nanoid; // Declaramos una variable para almacenar el import de nanoid

//Cargar dinámicamente el módulo nanoid en el momento en que se necesite
(async () => {
  nanoid = (await import('nanoid')).nanoid;
})();

const configuracionMulter = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${nanoid()}.${extension}`); // Usa nanoid para generar un identificador único
        }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        }
        else{
            cb(new Error('Formato de imagen inválido'));
        }
    }
};

//Pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

//Subir el archivo
exports.subirArchivo = async (req, res, next) => {
    upload(req, res, function(error){
        if(error){
            res.json({mensaje: error})
        }
        return next();
    });
}

//Agregar un producto nuevo
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);
    try{
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje: 'Se agregó un nuevo producto'});
    }
    catch(error){
        console.error('Error al agregar producto', error);
        next();
    }
}

//Consultar todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try{
        const producto = await Productos.find({});
        res.json(producto);
    }
    catch(error){
        console.error('Hubo un error al realizar la consulta', error);
        next();
    }
}

//Consultar producto por ID
exports.mostrarProducto = async (req, res, next) => {
    try{
        const producto = await Productos.findById({_id: req.params.idProducto});

        if(!producto){
            res.json({mensaje: 'Este producto no existe'});
            next();
        }
        res.json(producto)
    }
    catch(error){
        console.error('Hubo un error al realizar la consulta', error);
    }
}

//Actualizar producto por ID
exports.actualizarProducto = async (req, res, next) => {
    try{
        let nuevoProducto = req.body
        //Verficar si tiene nueva imagen
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        }
        else{
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({_id: req.params.idProducto}, nuevoProducto, {
            new: true
        })
        res.json({mensaje: 'Se actualizó el producto'});
    }
    catch(error){
        console.error('Error al actualizar el producto', error);
        next();
    }
}

//Eliminar producto por ID
exports.eliminarProducto = async (req, res, next) => {
    try{
        const producto = await Productos.findByIdAndDelete({_id: req.params.idProducto});
        res.json({mensaje: 'Se eliminó el producto'});
        next();
    }
    catch(error){
        console.error('Hubo un error al eliminar el producto', error);
    }
}