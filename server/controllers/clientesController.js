const Clientes = require('../models/clientes');
const clientes = require('../models/clientes');


//Agregar un nuevo cliente
exports.nuevoCliente = async(req, res) => {
    const cliente = new Clientes(req.body);
    try{
        //Almacenamiento de los datos
        await cliente.save();
        res.json({mensaje: 'Se agregó un nuevo cliente'})
    }
    catch(error){
        console.error('Hubo un error al agregar cliente', error);
    }
}

//Actualizar información cliente
exports.actualizarCliente = async(req, res) => {
    try{
        const cliente = await Clientes.findByIdAndUpdate({_id: req.params.idCliente}, req.body, {new: true});
        res.json(cliente);
    }
    catch(error){
        console.error('Hubo un error al actualizar', error);
        next();
    }
}

//Consultar información cliente
exports.mostrarCliente = async(req, res) => {
    try{
        const cliente = await Clientes.findById({_id: req.params.idCliente}, req.body);
        if(!cliente){
            res.json({mensaje: 'Cliente no existente'});
            next();
        }
        else{
            res.json(cliente);
        }
    }
    catch(error){
        console.error('Error al encontrar cliente', error);
    }
}

//Consultar todos los clientes
exports.obtenerClientes = async(req, res) => {
    try{
        const cliente = await Clientes.find({});
        if(cliente.length === 0){
            res.json({mensaje: 'No existen clientes'});
            next();
        }
        else{
            res.json(cliente);
        }
    }
    catch(error){
        console.error('Error al encontrar clientes', error);
    }
}

//Eliminar cliente
exports.eliminarCliente = async(req, res) => {
    try{
        const cliente = await Clientes.deleteOne({_id: req.params.idCliente});
        res.json({mensaje: 'El cliente fue eliminado'});
    }
    catch(error){
        console.log('Error al eliminar cliente', error);
    }
}