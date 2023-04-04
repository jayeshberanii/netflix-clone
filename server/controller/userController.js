const User=require('../models/UserModel')

module.exports.addToLikeMovies=async(req,res)=>{
    try {
        const{email,data}=req.body
        const user=await User.findOne({email:email})
        if(user){
            const {likedMovies}=user
            const movieAlreadyLiked=likedMovies.find(({id})=>(id=data.id))
            if(!movieAlreadyLiked){
                await User.findByIdAndUpdate(user._id,{
                    likedMovies:[...user.likedMovies,data],
                },
                {new:true})
            }else{
                res.status(404).json({msg:'movie alredy added to the like list'})
            }
        }
    } catch (error) {
        res.status(500).json({msg:"error while adding movie"})
    }
}