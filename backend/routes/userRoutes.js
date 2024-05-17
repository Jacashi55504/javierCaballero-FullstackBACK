const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { showData, login, register, updateUser, deleteUser } = require('../controller/userController');

router.get('/data', protect, showData);
router.post('/login', login);
router.post('/register', register);
router.put('/update/:email', protect, updateUser);
router.delete('/delete/:email', protect, deleteUser);

module.exports = router;
