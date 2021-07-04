require('dotenv').config();
const express = require('express');
const Db = require('./config/db');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./Routes/router');

//Enviroment Variable
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST

//Setup for App
const app = express();



app.use(bodyParser.json());
app.use(morgan());


app.use(router)

//DB connection
Db.authenticate()
.then(() => console.log('DB connected'))
.catch((error)=> console.log(error));



app.listen(PORT, ()=> console.log(`Server Running on ${HOST} at : ${PORT}`));