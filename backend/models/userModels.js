const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor teclea un nombre"]
    },
    email: {
        type: String,
        required: [true, "Por favor teclea un nombre"]
    },
    password: {
        type: String,
        required: [true, "Por favor teclea tu password"]
    },
    esAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
})

module.exports = mongoose.model('Usera', userSchema)
