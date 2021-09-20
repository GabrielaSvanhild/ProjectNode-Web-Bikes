
const Users = require('../models/Users')
const bcryptjs = require('bcryptjs')
const userControllers = {
    signUp: async (req, res) => {
        const {name, email, password} = req.body
        let hashedPassword = bcryptjs.hashSync(password,10)
        let newUser = await new Users({name,email,password: hashedPassword})
        Users.findOne({email : email})
        .then(user=>{
            if(user){
                throw new Error()
            }else{
                newUser.save()
                .then((newUser)=>{
                    req.session.loggedIn = true
                    req.session.name = newUser.name
                    req.session.userId=newUser._id
                    res.redirect('/') 
                })
            }
        })
        .catch(error=>{
            res.render('signUp', {
                loggedIn:false, 
                title: 'Sign Up',
                error:"The email is already in use"
            })
        })
        /* const {name, email, password} = req.body
        let cryptPass = bcryptjs.hashSync(password,10)
         let user = await new Users({name,email,password: cryptPass}).save()        
        req.session.loggedIn = true
		req.session.name = user.name
        res.redirect('/') */
    },
    signIn: async (req, res) => {
         const {email, password} = req.body
         Users.findOne({email})
         .then(user=>{
             if(!user){
                throw new Error() 
             }else{
                let correctPassword = bcryptjs.compareSync(password, user.password)
                if(correctPassword){
                    req.session.loggedIn = true
                    req.session.name = user.name
                    req.session.userId=user._id
                    console.log("linea 49 "+req.session.userId)
                    return res.redirect('/')
                }else{
                    throw new Error() 
                }
             }
         })
         .catch(error=>{
            res.render('signIn', {
                loggedIn:false, 
                title: 'Sign In',
                error:'E-mail/Password incorrect'
            })
         })
            
    },
    logOut: (req, res) => {
        req.session.destroy(() =>{
            res.redirect("/")
        })
    }

}

module.exports = userControllers






/* const User = require('../models/User')

const userControllers = {
    sign: (req, res) => {
        res.render('sign', {
            login: req.url === '/signin',
            title: req.url === '/signin' ? 'Sign In' : 'Sign Up',
            error: null
        })
    },

    signIn: async (req, res) => {
        const {username, password} = req.body
        let user = await User.findOne({username})
        if (user.password === password) {
            res.setHeader('Set-Cookie', 'lang=EN')
            return res.redirect('/')
        }
        res.render('sign', {
            login: true,
            title: 'Sign In',
            error: 'Credenciales no válidas!'
        })
    },

    signUp: async (req, res) => {
        const {username, password} = req.body
        await new User({username, password}).save()
        res.redirect('/')
    }
}

module.exports = userControllers */