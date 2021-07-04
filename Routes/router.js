const express = require('express');

const router = express.Router();

//Controllers
const createUserController = require('../controller/createUserController');
const getUserController = require('../controller/getUserController');
const getUsersController = require('../controller/getUsersController');
const updateUserController = require('../controller/updateUserController');
const deleteUserController = require('../controller/deleteUserController');

//Routers
router.post('/register', createUserController)
router.get('/users', getUsersController)
router.get('/users/:id', getUserController)
router.put('/update/:id', updateUserController)
router.delete('/delete/:id', deleteUserController)





module.exports = router;