const Users = require('../Models/user');
const { uuid } = require('uuidv4');
const bcryptjs = require('bcryptjs');
const validator = require('validator');

module.exports = async(req, res) => {
    try {
        let {email, password} = req.body;

        if(validator.isEmpty(email)){
            return res.status(400).json({
                success: false,
                message: "Oops Email address Required!"
            })
        }
        if(validator.isEmail(email) == false){
            return res.status(401).json({
                success: false,
                message: "Invalid email format"
            })
        }

        if(validator.isEmpty(password)){
            return res.status(400).json({
                success: false,
                message: "Oops Password Required!"
            })
        }

        let hashPassword = await bcryptjs.hash(password, 10)
        let checkUser = await Users.findOne({
            where:{
                email: email
            }
        })
        if(checkUser.email = email){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }

        const createUser = await Users.create({
            id: uuid(),
            email: email,
            password: hashPassword
        })
        return res.status(201).json({
            msg: "User Created"
        })
    } catch (e) {
        console.log(e);
    }
}