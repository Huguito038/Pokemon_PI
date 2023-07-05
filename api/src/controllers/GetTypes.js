const {Types} = require("../db")
const axios = require("axios")

const GetAllTypes = async(req,res)=>{
    try{
        const typess = await Types.findAll()
         if(!typess){
        const {data} = await axios.get("https://pokeapi.co/api/v2/type")

        const AllTypes = await Promise.all(data.results.map(async e=> await axios.get(e.url)))


        const types = AllTypes.map((e)=>{
            let ex = e.data
            let newtype = {
                id : ex.id,
                name : ex.name
            }
            return newtype
        })
        await Types.bulkCreate(types)
        return res.status(200).json(types)
    }
    return res.status(300).send("Tabla de Types ya cargada...")
    }catch(error){return res.status(400).send(error.message)}
   
}


module.exports = GetAllTypes