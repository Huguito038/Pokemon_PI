const {Pokemon} = require("../db")



const PostPokemon = async(req,res)=>{
    const {name,attack,defense,height,weigth,life,} = req.body

    const newPokemon ={
        id:2,
        name,
        attack,
        defense,
        height,
        weigth,
        life,
    }

    await Pokemon.findOrCreate(newPokemon)
    return res.send("Creado con exito")

}


module.exports = PostPokemon