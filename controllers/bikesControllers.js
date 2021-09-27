const Bikes = require('../models/Bike')


const bikesControllers ={
    create_new_bike: async(req,res)=>{
        const { title, description,modelOfBike,email,name,urlBike,id} = req.body
        let newBike; 
        if(!id){
            newBike = new Bikes({title, description,modelOfBike,email,name,urlBike,userId:req.params.id})
        }else{
            newBike = await Bikes.findOne({where:{id}})
            newBike.title=title 
            newBike.description=description
            newBike.modelOfBike=modelOfBike
            newBike.urlBike=urlBike
            newBike.userId=req.params.id
        }   
        try {
            await newBike.save()
            res.redirect('/')
        } catch(e) {
            res.render('submit', {
                title:"Submit a Bike",
                loggedIn : req.session.loggedIn,
                userId: req.params.id,
                error: e,
                edit:false,
                name: null || req.session.name
            })
        }
    },
    deleteBike:async(req,res)=>{
       try{
           let bikeDeleted = await Bikes.findByPk(req.params.id)
            await bikeDeleted.destroy()
            res.redirect('/')
       }catch(e){
            console.log(e)
            res.render('index',{
                title: "Home",
                bikes,
                loggedIn : req.session.loggedIn,
                userId: req.session.userId,
                name: null || req.session.name,
                error:"Technical problems"
            })
       }     
    }, 

    editBike:async(req,res)=>{
        try{
            let bikeToEdit = await Bikes.findByPk(req.params.id)
            res.render('submit', {
                title:"Submit a Bike",
                loggedIn : req.session.loggedIn,
                userId: req.session.userId,
                error: null,
                edit: bikeToEdit,
                name: null || req.session.name
            })  

        }catch(e){
            console.log(e)
            res.render('index',{
                title: "Home",
                bikes,
                loggedIn : req.session.loggedIn,
                userId: req.session.userId,
                name: null || req.session.name,
                error:"Technical problems"
            })
        }          
    },
  

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