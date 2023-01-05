const axios = require("axios");
const {Recipe, Diet} = require("../db");
const {API_KEY} = process.env;

//---Base Datos

const getRecipeInfo = async () => {
    try {
        //const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

        const apiInfo = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`);

        const data = await apiInfo.data.results;

        const recipeInfo = data?.map((recipe) => {

            return {
                id: recipe.id,
                name: recipe.title,
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                diets: recipe.diets,
                image: recipe.image,
                steps: recipe.analyzedInstructions[0]?.steps.map((e) => {
                    return {
                      number: e.number,
                      step: e.step,
                    };
                  }),
                };
            });

            return recipeInfo;

    } catch (error) {
        console.log("Error in getRecipeInfo", error);
    }
};

const getRecipeInfoDB = async () => {
    try {
        const DbInfo = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }
        });
        let data = JSON.parse(JSON.stringify(DbInfo, null, 2));
        data.forEach((ele) => (ele.diets = ele.diets.map((el) => el.name)));

        return data;

    } catch (error){
        console.log(error);
    }
}

const getAllRecipesInfo = async() => {
    try {
        const apiInfo = await getRecipeInfo();
        const dbInfo = await getRecipeInfoDB();
        const allInfo = [...apiInfo, ...dbInfo];
        return allInfo
    } catch (error) {
        console.error(error);
    }
}

//---Rutas Recetas

const postNewRecipe = async (objRecipe) => {
    try {
        const { name, summary, healthScore, steps, image, diets} = objRecipe;
        const recipe = {
            name,
            summary,
            healthScore,
            steps,
            image,
        };

        const dietType = await Diet.findAll({
            where: {name: diets},
        });

        const newRecipe = await Recipe.create(recipe);

        newRecipe.addDiet(dietType);
    } catch (error) {
        console.log("Error in postNewRecipe");
    }
}

const updateRecipe = async (id, info) => {
    try {
        await Recipe.update(info, {
            where: {id: id},
        });
    } catch (error) {
        console.log("Error in updateRecipe")
    }
}

// Rutas Dietas

const createDietBD = async() => {
    try {
        const dietTypes = [
            "gluten free",
            "ketogenic",
            "vegetarian",
            "lacto vegetarian",
            "ovo vegetarian",
            "vegan",
            "pescatarian",
            "paleo",
            "primal",
            "low fodmap",
            "whole 30",
            ];
        dietTypes.forEach((ele) => {
            Diet.findOrCreate({
                where: {name: ele},
            });
        });
    } catch (error) {
        console.log("Error in createDietBS");
    }
}

const getBDdietInfo = async () => {
    try {
        const diets = await Diet.findAll();
        return diets
    } catch (error) {
        console.error("Error in getBSdietInfo", error)
    }
};

module.exports = {
    getRecipeInfo,
    getBDdietInfo,
    getAllRecipesInfo,
    createDietBD,
    updateRecipe,
    postNewRecipe,
}