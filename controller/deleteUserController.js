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
        const deleteUser = await Users.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            success: true,
            message: "User deleted successful"
        })
    } catch (e) {
        console.log(e);
    }
}