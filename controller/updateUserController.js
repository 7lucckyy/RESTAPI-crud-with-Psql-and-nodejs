const Users = require('../Models/user');
const { uuid } = require('uuidv4');
const bcryptjs = require('bcryptjs');
const validator = require('validator');

module.exports = async(req, res) =>{
    try {
        
        let user_id = req.params.id
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
        const updateUser = await Users.findOne({
            where: {
                id: user_id
            }
        })
        updateUser.id = uuid();
        updateUser.email = email;
        updateUser.password = hashPassword
        await updateUser.save();

        return res.status(201).json({
            success: true,
            message: "User updated"
        })
    } catch (e) {
        console.log(e);
    }
}