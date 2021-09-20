const express = require('express')
const router = express.Router()
const pagesControllers = require('../controllers/pagesControllers')
const bikesControllers= require('../controllers/bikesControllers')
const userControllers=require('../controllers/userControllers')


router.route('/')
.get(pagesControllers.home)

router.route('/signIn')
.get(pagesControllers.signIn)
.post(userControllers.signIn)


router.route('/submitBike/:_id')
.get(pagesControllers.submitBike)
.post(bikesControllers.create_new_bike)

router.route('/signUp')
.get(pagesControllers.signUp)
.post(userControllers.signUp)

router.route('/deleteBike/:_id')
.get(bikesControllers.deleteBike)

router.route('/editBike/:_id')
.get(bikesControllers.editBike)

router.route('/logOut')
.get(userControllers.logOut)

router.route('/likes')
.get(bikesControllers.like_dislike_bike)

module.exports = router