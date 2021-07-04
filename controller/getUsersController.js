const Users = require('../Models/user');


module.exports = async(req, res)=>{
    try {
        let getUsers = await Users.findAll({});
        return res.status(200).json({
            success: true,
            message: "Retrieved Members",
            data: getUsers
        })
    } catch (e) {
        console.log(e);
    }
}