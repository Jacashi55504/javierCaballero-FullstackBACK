const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
//const User = require('../models/userModel')

const register = asyncHandler(async(req, res) => {
    res.status(201).json({message: "crear usuarios"})
})

const login = asyncHandler(async(req, res) => {
    res.status(200).json({message: "login user"})
})

const showdata = asyncHandler(async(req, res) => {
    res.status(200).json({message: "mis datos"})
})

module.exports = {
    register, 
    login,
    showdata
}