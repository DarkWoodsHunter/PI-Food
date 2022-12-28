const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ("axios");
const {Recipe, Diet} = require("../db")
const {YOUR_API_KEY} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const url = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
    const apiInfo = await url.data.map(ele => {
        return {
            id: ele.id,
            title: ele.title,
            image: ele.image,
            summary: ele.summary,
            vegetarian: ele.vegetarian,
            vegan: ele.vegan,
            glutenFree: ele.glutenFree,
            dairyFreee: ele.dairyFree,
            healthScore: ele.healthScore,
            dishesTypes: ele.dishTypes,
            diets: ele.diets?.map(ele => ele),
            steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):''),
        }
    })
    return apiInfo;
}

const getDbsInfo = async () => {
    const dbInfo = await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through:{
                attributes: [],
            }
        }
    })
    return dbInfo;
}

const getAllInfo = async () => {
    const ApiInfo = await getApiInfo();
    const DbInfo = await getDbsInfo();
    const TotalInfo = ApiInfo.concat(DbInfo);
    return TotalInfo;
}


router.get('/', async (req, res, next) => {
    try {
        const {name} =req.query;
        let allRecipes = await getAllInfo();
        if (name){
            let recipeName = await allRecipes.filter(ele => ele.name.toLowerCase().includes(name.toString().toLowerCase()));
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
    catch {
        return res.status(404).send('Input Invalido');
    }
})

module.exports = router;
