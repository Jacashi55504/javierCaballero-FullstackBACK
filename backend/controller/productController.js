const asyncHandler = require('express-async-handler')
const Product = require('../models/productModels')

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
})

const createProduct = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.description || req.body.price == null) { // Check for missing data
        res.status(400);
        throw new Error("Por favor completa todos los campos requeridos.");
    }
    const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock // Add in stock
    });
    
    res.status(201).json(product)
})

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(404)
        throw new Error('Producto no encontrado');
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedProduct)
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) { // check for product validation

        res.status(404)
        throw new Error('Producto no encontrado')
    }
    await product.deleteOne();
    res.status(200).json({message: `Producto eliminado: ${req.params.id}`})
})

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
