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
                edit:false,
            })
        }
    },
    deleteBike:(req,res)=>{
         Bikes.findOneAndDelete({_id:req.params._id})
        .then(()=>res.redirect('/'))
        .catch(()=>{
            //poner alerta al usuario!!
            res.redirect('/')
        })
        
    },
    editBike: (req,res)=>{
        console.log( req.params)
         Bikes.findOne({_id:req.params._id})
        .then((bike)=>{
            res.render('submit', {
            title:"Submit a Bike",
            loggedIn : req.session.loggedIn,
            userId: req.session.userId,
            error: null,
            edit: bike,
            })
        }) 
        .catch(error=>{
            console.log(error)
            //alertita error
        })
    },
    like_dislike_bike:(req,res)=>{
        console.log(req.query)
        Bikes.findOne({_id:req.query.idBike})
        .then((bike)=>{
            if(bike.likes.includes(req.query.idUser)){
                Bikes.findOneAndUpdate({_id:req.query.idBike},{$pull:{likes:req.query.idUser}})
                .then(()=>{
                    Bikes.find()
                    .then((bikes)=>{
                        res.render('index',{
                            title: "Home",
                            bikes,
                            loggedIn : req.session.loggedIn,
                            userId: req.session.userId,
                            name: null || req.session.name,
    
                        })                       
                    })
                })
            }else{
                Bikes.findOneAndUpdate({_id:req.query.idBike},{$push:{likes:req.query.idUser}})
                .then(()=>{
                    Bikes.find()
                    .then((bikes)=>{
                        res.render('index',{
                            title: "Home",
                            bikes,
                            loggedIn : req.session.loggedIn,
                            userId: req.session.userId,
                            name: null || req.session.name,
    
                        }) 
                    })

                })
            }
        })
        .catch((error)=>{
            console.log(error)
            //errror
        })

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