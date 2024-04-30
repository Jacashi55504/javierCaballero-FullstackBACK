const express = require('express')
const router = express.Router()

const {getTareas, crearTareas, updateTareas, deleteTareas} = require('../controller/tareasController')

router.get('/', getTareas)
router.post('/', crearTareas)

router.put('/:id', updateTareas)
router.delete('/:id', deleteTareas)

module.exports = router