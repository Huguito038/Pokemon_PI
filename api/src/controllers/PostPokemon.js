const {Pokemon} = require("../db")



const PostPokemon = async(req,res)=>{
    try{
        const {name,attack,defense,height,weigth,life,} = req.body
        






    }catch(error){return res.send(error.message)}
   



}


module.exports = PostPokemon