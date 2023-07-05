const axios = require("axios")
const {Pokemon,Type} = require("../db")


const GetPokemonsByName = async(req,res)=>{
    const {name} = req.query
    try{
        let nombre = name.toLowerCase()
        let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        let info=data
        if(info){return res.status(200).json( // Retorno del pokemon encontrado en la API
                {   name: info.name,
                    id: info.id,
                    img: info.sprites.other.dream_world.front_default,
                    life: info.stats[0].base_stat,
                    attack: info.stats[1].base_stat,
                    defense: info.stats[2].base_stat,
                    speed: info.stats[3].base_stat,
                    weight: info.weight,
                    height: info.height,
                    types: info.types.map((t) => t.type.name)
                },
            )
        }
        const pokeonDB = await Pokemon.findAll({where:{name:nombre}})
        if(pokeonDB){return res.json(pokeonDB)}
        return res.send("No existe pokemon con ese nombre...")
    } 
    catch(error){
        return res.status(400).send(error.message)
    }}






module.exports = GetPokemonsByName

//where:{name},include:{
//    model:Types,
//    attributes: ["name"],
//    through: {attributes:[]}