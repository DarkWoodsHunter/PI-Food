const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const {Recipe, Diet} = require("../db")
const {API_KEY} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const urlApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const { results } = urlApi.data;
    const apiInfo = await results?.map(ele => {
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
            steps: (ele.analyzedInstructions[0] && ele.analyzedInstructions[0].steps?ele.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):''),
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

//GET /recipes?name="":
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
        return res.status(404).send('Input Invalido');
    }
})

// GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    let validate = id.includes("-"); // Si tiene el guion es pq se encuentra en base de datos.
    try {
        if (validate) {
            let recipeDB = await get_DataBaseID(id);
            return res.status(200).send(recipeDB);
        } else { // Se encuentra en la API
            let recipeAPI = await get_ApiID(id);
            return res.status(200).send(recipeAPI);
        }
    } catch (err) {
        return res.status(404).send("IP incorrecta");
    }
});

module.exports = router;
