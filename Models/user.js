const Db = require('../config/db');
const sequelize = require('sequelize');
const {UUIDV4} = require('sequelize');


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

module.exports = Users;
