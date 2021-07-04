const Users = require('../Models/user');
const validator = require('validator');

module.exports = async(req, res) =>{
    try {
        let id = req.params.id
        if(validator.isUUID(id) == false){
            return res.status(400).json({
                success: false,
                message: "Invalid ID provide UUID"
            })
        }
        let getUser = await Users.findOne({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            success: true,
            message: "User Retrieved",
            data: getUser
        })
    } catch (e) {
        console.log(e);
    }
}