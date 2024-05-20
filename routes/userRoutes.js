const express = require('express');
// const { createUser, getUser, updateUser, deleteUser } = require('../controller/userController');
const userController = require('../controller/userController');
const router = express.Router();

router.post('/create', userController.createUser);
// router.get('/users/:id', getUser);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);   

module.exports = router;
