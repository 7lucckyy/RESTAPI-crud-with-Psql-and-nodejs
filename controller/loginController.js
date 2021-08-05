const Users = require('../Models/user');
const bcryptjs = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');



module.exports = async(req, res)=>{
    let {email, password} = req.body;

    
    let QueryUser = await Users.findOne({
        where:{
            email: email,
        }
    })
    if(!QueryUser){
        return res.status(404).json({
            success: false,
            message: " User not found"
        })
    }
    QueryUser.passwaord = await bcryptjs.compare(password, QueryUser.password)
    if(!QueryUser.password){
        return res.status(400).json({
            success: false,
            message: "Invalid Password"
        })
    }
    let userId = QueryUser.id;
    function generateAccessToken(userId) {
        return jwt.sign(userId, process.env.SECRET_KEY, { expiresIn: '1800s' });
      }
    const token = generateAccessToken({ userId: userId });
    res.status(200).json({
        success: true,
        message: "Login Success",
        data: {
            token
        }
    });
    
    
    return res.status(200).json({
        success: true,
        message: "Login Success"
    })
}