const mongoose = require('mongoose')

const bikeSchema = new mongoose.Schema({
    title: {type: String, required: true}, 
    description:  {type: String, required: true},
    modelOfBike:  {type: String, required: true},
    email:{type: String, required: true},
    name:{type: String, required: true},
    urlBike:{type: String, required: true},
    likes:{type: Array},
    comments:{type: Array}   ,  
    userId: {type:mongoose.Types.ObjectId,ref:'user',required:true} 
})



const Bikes = mongoose.model('bike', bikeSchema)

module.exports = Bikes