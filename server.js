const express = require('express')
 const router = require('./routes/index') 
 const session = require("express-session")
const mongo = require('connect-mongodb-session')(session)
 require('dotenv').config()
 require('./config/database')
 const routeControllers = require('./controllers/routeControllers')

 const myStore = new mongo({
	uri: process.env.MONGODB,
	collection: "sessions",
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
}))
app.use('/', routeControllers.control_url, router)


app.listen(process.env.PORT, process.env.HOST || '0.0.0.0', () => console.log("Server listening"))
