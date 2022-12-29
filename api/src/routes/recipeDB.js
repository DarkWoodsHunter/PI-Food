const { Router } = require("express");
const { Recipe, Diet } = require('../db');


const router = Router();

router.post('/', async (req, res) => {
    const {name, summary, score, healthScore, image, steps, diets} = req.body;
    try {
        const createRecipe = await Recipe.create({
            name,
            summary, 
            score, 
            healthScore, 
            image, 
            steps
        })
        const GetDBdiet = await Diet.findAll({
            where: {
                name: diets,
            }
        });
        createRecipe.addDiet(GetDBdiet);
        res.status(200).send("Receta Creada exitosamente");
    }
    catch(error) {
        res.status(400).send(error);
    }
})

module.exports = router;