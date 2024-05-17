const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    getPedidos,
    crearPedidos,
    modificarPedidos,
    borrarPedidos,
    borrarProductoPedido
} = require('../controller/pedidosController');

router.get('/', protect, getPedidos);
router.post('/', protect, crearPedidos);
router.put('/:id', protect, modificarPedidos);
router.delete('/:id', protect, borrarPedidos);
router.delete('/:pedidoId/productos/:productoId', protect, borrarProductoPedido);

module.exports = router;
