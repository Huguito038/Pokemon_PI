const axios = require("axios");
const {Pokemon} = require("../db")


const GetPokemons = async(req,res)=>{
    try{
        const {data} = await axios("https://pokeapi.co/api/v2/pokemon?limit=80")

        const {results} = data

        const allPokemons = await Promise.all(results.map(e=>axios(e.url)))

        const pokeapi = allPokemons.map(obj=>{
            let e = obj.data
            let pokemon = {
                id : e.id,
                name : (e.name).charAt(0).toUpperCase() + (e.name).slice(1),
                life : e.stats[0].base_stat,
                attack : e.stats[1].base_stat,
                defense : e.stats[2].base_stat,
                speed : e.stats[5].base_stat,
                height : e.height,
                weight : e.weight,
                image: e.sprites.other.home.front_default,
                typess: e.types.map((t) => t.type.name),
            }
            return pokemon
        })

        await Pokemon.bulkCreate(pokeapi)

        return res.status(200).json(pokeapi)



    }catch(error){res.status(404).send(error.message)}

}


module.exports = GetPokemons