const asyncHandler = require("express-async-handler");
const Pedido = require("../models/pedidoModel");
const Product = require("../models/productModel");

const getPedidos = asyncHandler(async (req, res) => {
    const pedidos = await Pedido.find({ user: req.user.id }).populate('productos');
    res.status(200).json(pedidos);
});

const crearPedidos = asyncHandler(async (req, res) => {
    if (!req.body.productos || !req.body.cantidades) {
        res.status(400);
        throw new Error('Faltan productos o cantidades');
    }

    const productosObjectId = await Promise.all(req.body.productos.map(async (nombreProducto, index) => {
        let producto = await Product.findOne({ name: nombreProducto });
        if (!producto) {
            res.status(404);
            throw new Error(`Producto no encontrado: ${nombreProducto}`);
        }
        return producto._id;
    }));

    const total = await calcularTotalPedido(req.body.productos, req.body.cantidades);

    const pedido = await Pedido.create({
        user: req.user.id,
        productos: productosObjectId,
        cantidades: req.body.cantidades,
        total
    });

    res.status(201).json(pedido);
});

const calcularTotalPedido = async (productos, cantidades) => {
    try {
        if (!Array.isArray(productos)) {
            throw new Error('Los productos deben ser proporcionados como un array');
        }

        const precios = await Promise.all(productos.map(async (nombreProducto) => {
            const producto = await Product.findOne({ name: nombreProducto });
            if (!producto) {
                throw new Error(`Producto no encontrado: ${nombreProducto}`);
            }
            return producto.price;
        }));

        const total = precios.reduce((acc, precio, index) => acc + (precio * cantidades[index]), 0);

        return total;
    } catch (error) {
        console.error("Error al calcular el precio total del pedido:", error);
        throw new Error('Error al calcular el precio total del pedido');
    }
};

const modificarPedidos = asyncHandler(async (req, res) => {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) {
        res.status(404);
        throw new Error('No se encontró el pedido');
    }

    const productosObjectId = await Promise.all(req.body.productos.map(async (nombreProducto, index) => {
        let producto = await Product.findOne({ name: nombreProducto });
        if (!producto) {
            res.status(404);
            throw new Error(`Producto no encontrado: ${nombreProducto}`);
        }
        return producto._id;
    }));

    const total = await calcularTotalPedido(req.body.productos, req.body.cantidades);

    pedido.productos = productosObjectId;
    pedido.cantidades = req.body.cantidades;
    pedido.total = total;

    await pedido.save();

    res.status(200).json(pedido);
});

const borrarPedidos = asyncHandler(async (req, res) => {
    const pedidoDeleted = await Pedido.findById(req.params.id);
    if (!pedidoDeleted) {
        res.status(404);
        throw new Error('No se encontró el pedido');
    }
    await Pedido.deleteOne(pedidoDeleted);
    res.status(200).json({ message: `Se eliminó el pedido: ${req.params.id}` });
});

const borrarProductoPedido = asyncHandler(async (req, res) => {
    const pedido = await Pedido.findById(req.params.pedidoId).populate('productos');
    if (!pedido) {
        res.status(404);
        throw new Error('Pedido no encontrado');
    }

    const productoIndex = pedido.productos.findIndex(productoId => productoId._id.toString() === req.params.productoId);
    if (productoIndex === -1) {
        res.status(404);
        throw new Error('Producto no encontrado en el pedido');
    }

    pedido.productos.splice(productoIndex, 1);
    pedido.cantidades.splice(productoIndex, 1);

    if (pedido.productos.length === 0) {
        await Pedido.deleteOne({ _id: req.params.pedidoId });
        res.status(200).json({ message: 'Pedido eliminado porque no quedan productos' });
    } else {
        const total = await calcularTotalPedido(pedido.productos.map(producto => producto.name), pedido.cantidades);
        pedido.total = total;
        await pedido.save();
        res.status(200).json({ message: 'Producto eliminado del pedido', pedido });
    }
});

module.exports = {
    getPedidos,
    crearPedidos,
    modificarPedidos,
    borrarPedidos,
    borrarProductoPedido
};
