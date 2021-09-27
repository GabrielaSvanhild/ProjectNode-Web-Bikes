const Sequelize = require('sequelize')
const db = require('../config/db')

const Bike= db.define('bike', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    modelOfBike:{
        type: Sequelize.STRING,
        allowNull: false
    },
    urlBike:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Bike


/* const mongoose = require('mongoose')

const bikeSchema = new mongoose.Schema({
    title: {type: String, required: true}, 
    description:  {type: String, required: true},
    modelOfBike:  {type: String, required: true},
    urlBike:{type: String, required: true},
    likes:{type: Array},
    userId: {type:mongoose.Types.ObjectId,ref:'user',required:true} 
})



const Bikes = mongoose.model('bike', bikeSchema)

module.exports = Bikes */