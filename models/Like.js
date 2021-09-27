const Sequelize = require('sequelize')
const db = require('../config/db')
const Like= db.define('like', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})
module.exports=Like