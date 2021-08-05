const express = require('express');
const bodyParser = require('body-parser')



const router = express.Router();
router.use(bodyParser.json());

//Controllers
const createUserController = require('../controller/createUserController');
const getUserController = require('../controller/getUserController');
const getUsersController = require('../controller/getUsersController');
const updateUserController = require('../controller/updateUserController');
const deleteUserController = require('../controller/deleteUserController');
const loginController = require('../controller/loginController');
const jwtAuth = require('../auth/jwtAuth');

//Routers
router.post('/register', createUserController)
router.get('/users', [jwtAuth],getUsersController)
router.get('/users/:id', [jwtAuth],getUserController)
router.put('/update/:id', [jwtAuth],updateUserController)
router.delete('/delete/:id', [jwtAuth],deleteUserController)
router.post('/login',  loginController)


module.exports = router;