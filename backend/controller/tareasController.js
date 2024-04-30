const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareaModel')

const getTareas = asyncHandler( async(req, res) => {
    const tareas =await Tarea.find()
    res.status(200).json(tareas)
})

const crearTareas =asyncHandler( async(req, res) => {
    if(!req.body.descripcion) {
        res.status(400)
        throw new Error("Error")
    }
    const tarea= await Tarea.create({
        descripcion: req.body.descripcion
    })
    
    res.status(201).json(tarea);
})

const updateTareas =asyncHandler( async(req, res) => {
    const tarea =await Tarea.findById(req.params.id)
    if(!tarea){
        res.status(404)
        throw new Error('La tarea no existe ')
    }
    const tareaUpdated=await Tarea.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(tareaUpdated)
})

const deleteTareas =asyncHandler( async(req, res) => {
    res.status(200).json({message: `Eliminar la tarea ${req.params.id}`})
})

module.exports = {
    getTareas,
    crearTareas,
    updateTareas,
    deleteTareas
}
