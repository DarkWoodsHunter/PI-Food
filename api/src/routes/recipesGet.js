const { Router } = require('express');
const axios = require('axios');
const { getAllInfo, getApiByID, getDbByID,} = require ("../Controllers/Recipes");

const router = Router();

//GET /recipes?name="...":
router.get('/', async (req, res) => {
    try {
        const {name} =req.query;
        let allRecipes = await getAllInfo();
        if (name){
            let recipeName = await allRecipes.filter(ele => ele.name.toLowerCase().includes(name.toString().toLowerCase()))
            
            if (recipeName.length){
                let recip = recipeName.map(ele => {
                    return {
                        title: ele.title,
                        image: ele.image,
                        id: ele.id,
                        diets: ele.diets? ele.diets: ele.diets.map(e => e.name),
                        healthScore: ele.healthScore,
                    }
                })
                return res.status(200).send(recip);
            }
            return res.status(404).send('No se encuentra la receta');
        }
        else{
            let recip = allRecipes.map(ele => {
                return{
                    title: ele.title,
                    image: ele.image,
                    id: ele.id,
                    diets: ele.diets? ele.diets: ele.diets.map(e => e.name),
                    healthScore: ele.healthScore,
                }
            })
            return res.status(200).send(recip);
        }
    }
    catch (error) {
        return res.status(400).send('Input Invalido');
    }
})

//GET /recipes/{idReceta}:
router.get('/id', async (req, res) => {
    try {
        const { id } = req.params;
        let check = id.includes("-");
        if (check){
            let recipeInDB = await getDbByID(id);
            return res.status(200).send(recipeInDB);
        } else {
            let recipeInApi = await getApiByID(id);
            return res.status(200).send(recipeInApi);
        }

    }
    catch{
        return res.status(404).send("No se encontro la receta");
    }
})

module.exports = router;