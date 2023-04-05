const { addMoviesToMyList, getMyPlayList, removeMoviesFromMyList } = require('../controller/userController')

const route=require('express').Router()

route.post('/add',addMoviesToMyList)
route.post('/remove',removeMoviesFromMyList)
route.post('/get-play-list',getMyPlayList)

module.exports=route