
const Users = require('../models/Users')
const bcryptjs = require('bcryptjs')
const userControllers = {
    signUp: async (req, res) => {
        const {name, email, password} = req.body
        let hashedPassword = bcryptjs.hashSync(password,10)
        let newUser = await new Users({name,email,password: hashedPassword})
        Users.findOne({where:{email}})
        .then(user=>{
            if(user){
                throw new Error()
            }else{
                newUser.save()
                .then((newUser)=>{
                    req.session.loggedIn = true
                    req.session.name = newUser.name
                    req.session.userId=newUser.id
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
    },
    signIn: async (req, res) => {
         const {email, password} = req.body
         Users.findOne({where:{email}})
         .then(user=>{
             if(!user){
                throw new Error() 
             }else{
                let correctPassword = bcryptjs.compareSync(password, user.password)
                if(correctPassword){
                    req.session.loggedIn = true
                    req.session.name = user.name
                    req.session.userId=user.id
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
