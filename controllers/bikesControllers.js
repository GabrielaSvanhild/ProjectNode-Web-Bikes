const Bikes = require('../models/Bike')


const bikesControllers ={
    create_new_bike: async(req,res)=>{
        const { title, description,modelOfBike,email,name,urlBike,_id} = req.body
        let newBike; 
        if(!_id){
            newBike = new Bikes({title, description,modelOfBike,email,name,urlBike,userId:req.params._id})
        }else{
            newBike = await Bikes.findOne({_id})
            newBike.title=title 
            newBike.description=description
            newBike.modelOfBike=modelOfBike
            newBike.email=email
            newBike.name=name
            newBike.urlBike=urlBike
            newBike.userId=req.params._id
        }   
        try {
            await newBike.save()
            res.redirect('/')
        } catch(e) {
            res.render('submit', {
                title:"Submit a Bike",
                loggedIn : req.session.loggedIn,
                userId: req.params._id,
                error: e,
                edit:false
            })
        }
    },
    deleteBike:async (req,res)=>{
        await Bikes.findOneAndDelete({_id:req.params._id})
        res.redirect('/')
    },
    editBike: async (req,res)=>{
        console.log( req.params)
        let bike = await Bikes.findOne({_id:req.params._id})
        res.render('submit', {
            title:"Submit a Bike",
            loggedIn : req.session.loggedIn,
            userId: req.session.userId,
            error: null,
            edit: bike
        })
    }
}
module.exports = bikesControllers
























  /*  }else {
            newBike = await Bikes.findOne({_id})
            newBike.title=title 
            newBike.description=description
            newBike.modelOfBike=modelOfBike
            newBike.email=email
            newBike.name=name
            newBike.urlBike=urlBike
        } */