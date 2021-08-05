const Db = require('../config/db');
const sequelize = require('sequelize');

const Users = require('./user');

const Contact = Db.define('contactinfo', {
    id:{
        type: sequelize.UUID,
        primaryKey: true
    },
    address:{
        type: sequelize.STRING
    },
    users_id:{
        type: sequelize.UUID,
    },
    phone: {
        type: sequelize.STRING
    }



})

module.exports = Contact;

