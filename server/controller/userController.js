const User = require('../models/UserModel')


//TODO: Add Movie To My List
module.exports.addMoviesToMyList = async (req, res) => {
    try {
        const { email, data } = req.body
        console.log(data);
        const user = await User.findOne({ email: email })
        if (!user) {
            await User.create({ email, likedMovies: [data] })
            res.status(200).json({ msg: "movie added successfully" })
        } else {
            const { likedMovies } = user
            const movieAlreadyLiked = likedMovies.find(({ id }) => (id === data.id))
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(user._id, {
                    likedMovies: [...user.likedMovies, data],
                },
                    { new: true })
                res.status(200).json({ msg: "movie added successfully" })
            } else {
                res.status(400).json({ msg: 'movie already added to the my list' })
            }
        }

    } catch (error) {
        res.status(500).json({ msg: "error while adding movie" })
    }
}
//TODO : Remove Movie From PLayList
module.exports.removeMoviesFromMyList = async (req, res) => {
    try {
        const { email,data } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ msg: "user not found while getting playlist" })
        } else {
            const{likedMovies}=user
            const filteredLikedMovie=likedMovies.find(({id})=>id===data.id)
            if(!filteredLikedMovie){
                res.status(400).json({msg:"movie not found in playlist while removing movie from playlist"})
            }else{
                const response=await User.findByIdAndUpdate(user._id,{$pull:{likedMovies:{id:data.id}}})
                response && res.status(200).json({msg:"removed movie from playlist"})
            }
        }
    } catch (error) {
        res.status(500).json({ msg: "error while adding movie" })
    }
}

//TODO : Get User PLayList
module.exports.getMyPlayList = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ msg: "user not found while getting playlist" })
        } else {
            res.status(200).json(user.likedMovies)
        }
    } catch (error) {
        res.status(500).json({ msg: "error while getting playlist" })
    }
}

