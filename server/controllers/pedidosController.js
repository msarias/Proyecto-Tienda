const pedidos = require('../models/pedidos');
const Pedidos = require('../models/pedidos');

//Agregar un nuevo pedido
exports.nuevoPedido = async(req, res, next) => {
    const pedido = new Pedidos(req.body);
    try{
        await pedido.save();
        res.json({mensaje: 'Se agregó un nuevo pedido'});
    }
    catch(error){
        console.error(error);
        next();
    }
}

//Mostrar todos los pedidos
exports.mostrarPedidos = async(req, res, next) => {
    try{
        const pedido = await Pedidos.find({}).populate('cliente')
        .populate({path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedido);
    }
    catch(error){
        console.error('Error al consultar los pedidos', error);
        next();
    }
}

//Mostrar pedido por ID
exports.mostrarPedido = async(req, res, next) => {
    try{
        const pedido = await Pedidos.findById({_id: req.params.idPedido}).populate('cliente')
        .populate({path: 'pedido.producto',
            model: 'Productos'
        });
        res.json({pedido})
    }
    catch(error){
        console.error(error);
        next();
    }
}

//Actualizar pedido por ID
exports.actualizarPedido = async(req, res, next) => {
    try{
        const pedido = await Pedidos.findByIdAndUpdate({_id: req.params.idPedido}, req.body, {new: true}).populate('cliente')
        .populate({path: 'pedido.producto',
            model: 'Productos'
        });
        res.json({mensaje: 'Se actualizó el pedido'})
    }
    catch(error){
        console.error(error);
        next();
    }
}

//Eliminar pedido por ID
exports.eliminarPedido = async(req, res, next) => {
    try{
        const pedido = await Pedidos.findByIdAndDelete({_id: req.params.idPedido});
        res.json({mensaje: 'Se eliminó el pedido'})
    }
    catch(error){
        console.error(error);
        next();
    }
}