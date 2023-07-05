const axios = require("axios")
const {Pokemon,Types} = require("../db")


const GetPokemonsByName = async(req,res)=>{
    try{
        const {name} = req.query
        nombre = name.toLowerCase()
        let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        const info=data
        if(!info){
            const pokemon = await Pokemon.findOne({where:{name:name}})
            if(!pokemon){res.send("No hay pokemons con ese nombre...")} // Retorno si el pokemon no estaba en la base de datos
            return res.json("Pokemon Encontrado en la base de Datos")  // Pokemon encontrado en la BD
        }else{
            return res.status(200).json( // Retorno del pokemon encontrado en la API
                {   name: info.name,
                    id: info.id,
                    img: info.sprites.other.dream_world.front_default,
                    hp: info.stats[0].base_stat,
                    attack: info.stats[1].base_stat,
                    defense: info.stats[2].base_stat,
                    speed: info.stats[3].base_stat,
                    types: info.types.map((t) => t.type.name),
                    weight: info.weight,
                    height: info.height,
                },
            )
        } 
        
    }
    catch(error){
        return res.status(400).send(error.message)
    }}






module.exports = GetPokemonsByName

//where:{name},include:{
//    model:Types,
//    attributes: ["name"],
//    through: {attributes:[]}