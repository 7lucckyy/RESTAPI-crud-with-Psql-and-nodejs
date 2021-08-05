const Db = require('../config/db');
const sequelize = require('sequelize');
const Contact = require('./Contact');


const Users = Db.define(process.env.TABLENAME, {
    id:{
        type: sequelize.UUIDV4,
        notnull: true,
        primaryKey: true
    },
    email: {
        type: sequelize.STRING
    },
    password: {
        type: sequelize.STRING
    }
})

Users.hasOne(Contact, {
    foreignKey:'users_id'
})
Contact.belongsTo(Users,{
    foreignKey:'users_id'
})
module.exports = Users;
