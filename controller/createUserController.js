const Users = require('../Models/user');
const { uuid } = require('uuidv4');
const bcryptjs = require('bcryptjs');
const validator = require('validator');
const bodyParser = require('body-parser');
const Contact = require('../Models/Contact');
const Db = require('../config/db');

module.exports = async(req, res) => {
    try {
        let {email, password, address, phone, location} = req.body;

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
        if(checkUser){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }
        const Transaction = await Db.transaction();

        try {
            const UserUUID = uuid();

            const createUser = await Users.create({
                id: UserUUID,
                email: email,
                password: hashPassword
            },{
                transaction:Transaction
            })

            await Contact.create({
                id: uuid(),
                users_id:UserUUID,
                address: address,
                phone: phone,
                location: location
            },{
                transaction:Transaction
            });

            await Transaction.commit();
            return res.status(201).json({
                msg: "User Created"
            }) 
        } catch (e) {
            await Transaction.rollback();
            console.log(e)
        }
        
        
    } catch (e) {
        console.log(e);
    }
}