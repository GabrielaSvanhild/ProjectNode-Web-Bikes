const Sequelize = require('sequelize')
const db = require('../config/db')

const User= db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User
/* const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    email:{type: String, required: true},
    password:{type: String, required: true}
})



const Users = mongoose.model('user',userSchema)

module.exports = Users */