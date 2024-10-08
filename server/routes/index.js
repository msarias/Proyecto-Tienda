const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const productos = require('../models/productos');
const productosController = require('../controllers/productosController');
const pedidos = require('../models/pedidos');
const pedidosController = require('../controllers/pedidosController');

module.exports = function(){
    //CLIENTES
    //Agregar un nuevo cliente
    router.post('/clientes/create', clientesController.nuevoCliente);
    
    //Actualizar cliente por ID
    router.put('/clientes/:idCliente', clientesController.actualizarCliente);

    //Consultar todos los clientes
    router.get('/clientes', clientesController.obtenerClientes)
    
    //Consultar cliente por ID
    router.get('/clientes/:idCliente', clientesController.mostrarCliente);

    //Eliminar cliente por ID
    router.delete('/clientes/:idCliente', clientesController.eliminarCliente);


    //PRODUCTOS
    //Agregar un producto
    router.post('/productos', productosController.subirArchivo, productosController.nuevoProducto);

    //Consultar todos los productos
    router.get('/productos', productosController.mostrarProductos);

    //Consultar producto por ID
    router.get('/producto/:idProducto', productosController.mostrarProducto);

    //Actualizar producto por ID
    router.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto);

    //Eliminar producto por ID
    router.delete('/productos/:idProducto', productosController.eliminarProducto);
    

    //PEDIDOS
    //Agregar un nuevo pedido
    router.post('/pedidos', pedidosController.nuevoPedido);

    //Consultar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    //Consultar pedido por ID
    router.get('/pedido/:idPedido', pedidosController.mostrarPedido);

    //Actualizar pedido por ID
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

    //Eliminar pedido por ID
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);

    return router;
}
