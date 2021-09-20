const Bikes = require('../models/Bike')

const pagesControllers = {
    home: async(req, res) => {
    const bikes= await Bikes.find()
    console.log(req.session.userId)
        res.render('index',{
            title: "Home",
            bikes,
            loggedIn : req.session.loggedIn,
            userId: req.session.userId,
			name: null || req.session.name
        })
    },
    signIn: (req, res) => {
        if(req.session.loggedIn){
            res.redirect('/')

        }else{
            res.render('signIn',{
                title: "Sign In",
                loggedIn : req.session.loggedIn,
                userId: req.session.userId,
                error:null
            })
        }
        
    },
    signUp: (req, res) => {
        if(req.session.loggedIn){
            res.redirect('/')

        }else{
            res.render('signUp',{
                title: "Sign Up",
                loggedIn : req.session.loggedIn,
                userId: req.session.userId,
                error:null
            })
        }
        
    },
    submitBike: (req, res) => {
        if (req.session.loggedIn) {
            return res.render('submit',{
                title:"Submit a Bike",
                loggedIn : req.session.loggedIn,
                error:null,
                edit:false,
                userId: req.session.userId,
            })    
        }
    res.redirect('/')

    },
}

module.exports = pagesControllers