const axios = require("axios")
const {Pokemon,Type} = require("../db")

const GetPokemonById = async(req,res)=>{
    const {id} = req.params;
    try{
        let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const poke = {
                id: data.id,
                name: (data.name).charAt(0).toUpperCase() + (data.name).slice(1),
                image: data.sprites.versions["generation-v"]['black-white'].animated.front_default,
                health: data.stats[0].base_stat,
                defense: data.stats[2].base_stat,
                attack: data.stats[1].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map( type => type.type.name)
            }
        if(data){return res.status(201).json(poke)}// Devuelve el pokemon de la peticion a la API

        const pokemonInDb = await Pokemon.findByPk(id, { //Buscar Pokemon En la DB 
            include: {
              model: Type,
              attributes: ['name'],
              through: { attributes: [] },
            },
          })
          const pokemonWithTypes = {  //Busca el pokemon en la BD con su propiedad Types mapeada y retornada
            id: pokemonInDb.id,
            name: pokemonInDb.name,
            image: pokemonInDb.image,
            health: pokemonInDb.health,
            attack: pokemonInDb.attack,
            defense: pokemonInDb.defense,
            speed: pokemonInDb.speed,
            height: pokemonInDb.height,
            weight: pokemonInDb.weight,
            types: pokemonInDb.type.map((type) => type),}

         if(pokemonInDb){return res.status(200).json(pokemonWithTypes)}
         
         return res.send("No existe pokemon con ese ID...")

        }catch(error){res.status(401).send(error.message)}//Return del error
        
    }
    


module.exports = GetPokemonById