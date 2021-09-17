const Bikes = require('../models/Bike')

const pagesControllers = {
    home: async(req, res) => {
    const bikes= await Bikes.find()
        res.render('index',{
            title: "Home",
            bikes,
            loggedIn : req.session.loggedIn,
            userId: req.session.userId,
			name: null || req.session.name
        })
    },
    signIn: (req, res) => {
        res.render('signIn',{
            title: "Sign In",
            loggedIn : req.session.loggedIn,
            error:null
        })
    },
    signUp: (req, res) => {
        res.render('signUp',{
            title: "Sign Up",
            loggedIn : req.session.loggedIn,
            error:null
        })
    },
    submitBike: (req, res) => {
        res.render('submit',{
            title:"Submit a Bike",
            loggedIn : req.session.loggedIn,
            error:null,
            edit:false,
            userId: req.session.userId
        })
    },
    /* deletePost:async (req, res)=>{
        await Bikes.findOneAndDelete({_id=)
    } */
}

module.exports = pagesControllers