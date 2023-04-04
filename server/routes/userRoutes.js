const { addToLikeMovies } = require('../controller/userController')

const route=require('express').Router()

route.post('/add',addToLikeMovies)

module.exports=route