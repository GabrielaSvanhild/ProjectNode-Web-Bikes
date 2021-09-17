const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    email:{type: String, required: true},
    password:{type: String, required: true}

   /*  bikeId={type:mongoose.Types.ObjectId,ref:'bike',required:true} ,
    bike:{type: String, required: true},    */
})



const Users = mongoose.model('user',userSchema)

module.exports = Users