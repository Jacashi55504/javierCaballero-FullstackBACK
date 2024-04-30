const express = require('express')
const router = express.Router()

const {login, register, showdata} = require('../controller/userController')

router.post('/login', login)
router.post('/register', register)

router.get('/showdata', showdata)


module.exports = router