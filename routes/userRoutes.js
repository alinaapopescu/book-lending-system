const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();


router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/create', userController.createUser);
// router.get('/users/:id', getUser);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);   

module.exports = router;
