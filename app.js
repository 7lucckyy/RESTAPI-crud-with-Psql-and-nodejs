require('dotenv').config();
const express = require('express');
const Db = require('./config/db');
const bodyParser = require('body-parser');
const multer = require('multer');
const logoSrc = require('./Models/logo');
const morgan = require('morgan');
const router = require('./Routes/router');
const { uuid } = require('uuidv4');
const path = require('path');

//Enviroment Variable
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + '' + file.originalname)
    },
  })

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype ==='image/jpg' || file.mimetype ==='image/jpeg'){
        cb(null, true)
    }else{
        return cb("Error: Images Only!")

    }
   
}
const uploads = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }

});


//Setup for App
const app = express();



app.use(bodyParser.json());
app.use(morgan());


app.use(router)



app.post('/uploads', uploads.fields([{name: 'logosrc', maxCount: 1}, {name: 'image', maxCount: 1}]), async(req, res)=>{
    try {
        console.log(req.files);
        let logo = req.files.logosrc[0];
        let image = req.files.image[0];
        const uploadLogo = await logoSrc.create({
            id: uuid(),
            logosrc: logo.path,
            image: image.path,

        })
        await uploadLogo.save();
        return res.status(201).json({
            msg: 'Created Successfully',
            Success: true
        })
        
    } catch (e) {
        console.log(e);
    }
})

//DB connection
Db.authenticate()
.then(() => console.log('DB connected'))
.catch((error)=> console.log(error));



app.listen(PORT, ()=> console.log(`Server Running on ${HOST} at : ${PORT}`));