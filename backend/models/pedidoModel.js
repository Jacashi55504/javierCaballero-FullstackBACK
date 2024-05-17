const mongoose = require("mongoose");

const pedidoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    cantidades: [{
        type: Number
    }],
    total: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Pedido", pedidoSchema);
