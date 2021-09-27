const express = require('express')
 const router = require('./routes/index') 
 const session = require("express-session")
 var Sequelize = require("sequelize")
 const database =  require('./config/db')
 require('dotenv').config()
const SequelizeStore = require("connect-session-sequelize")(session.Store);
 const routeControllers = require('./controllers/routeControllers')
 const User=require("./models/Users")
 const Bike =require("./models/Bike")
 const Like =require("./models/Like")

 var myStore=new SequelizeStore({
	 db:database
 })
const app = express()

app.use(express.static('public'))
app.set('view engine','ejs')//automaticamnete va a buscar las vistas en las carpeta views y va a bucar a buscar archivos ejs
app.use(express.urlencoded({extended: true}))

app.use(session({
	secret: process.env.FRASE,
	resave: false,
	saveUninitialized: false,
	store: myStore,
	proxy:true
}))

myStore.sync()

Bike.belongsTo(User)
User.hasMany(Bike)
Bike.hasMany(Like)
Like.belongsTo(Bike)
User.hasMany(Like)
Like.belongsTo(User)

database.sync()
.then(()=>{
	app.use('/', routeControllers.control_url, router)
	app.listen(4000, () => console.log("Server listening"))

})

/* 
app.listen(process.env.PORT, process.env.HOST || '0.0.0.0', () => console.log("Server listening")) */
