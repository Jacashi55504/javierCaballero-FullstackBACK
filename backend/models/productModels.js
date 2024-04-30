const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor ingresa el nombre del producto"]
    },
    description: {
        type: String,
        required: [true, "Por favor ingresa una descripción del producto"]
    },
    price: {
        type: Number,
        required: [true, "Por favor ingresa el precio del producto"]
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Product', productSchema);
