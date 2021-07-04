const sequelize = require('sequelize');
require('dotenv').config();

const Db = new sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD,
{
    host: process.env.HOSTNAME,
    dialect: process.env.DIALECTNAME
})

module.exports = Db;