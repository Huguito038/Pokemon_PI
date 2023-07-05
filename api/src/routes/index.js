const { Router } = require('express');
const GetPokemonById = require("../controllers/GetPokemonById")
const GetPokemons = require("../controllers/GetPokemons")
const GetPokemonsByName = require("../controllers/GetPokemonsByName")
const GetAllTypes = require("../controllers/GetTypes")
const PostPokemon = require("../controllers/PostPokemon")
const router = Router();

router.get("/pokemons",GetPokemons)

router.get("/pokemons/:id",GetPokemonById)

router.get("/nombre", GetPokemonsByName)

router.post("/pokemons",PostPokemon)

router.get("/types", GetAllTypes)

module.exports = router;
