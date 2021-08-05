const Db = require('../config/db');
const sequelize = require('sequelize');

const logoSrc = Db.define('logosrcs', {
    id:{
        type: sequelize.UUID,
        primaryKey: true,
        allowNull: false
    },
    logosrc:{
        type: sequelize.STRING,

    },
    image: {
        type: sequelize.STRING,
    }
})

module.exports = logoSrc;