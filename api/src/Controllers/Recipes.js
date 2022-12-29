const axios = require("axios");
const db = require("../db");
const { Diet, Recipe } = require("../db");
const { API_KEY} = process.env;

//Controllers
//Get info from Api link

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
            steps: ele.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.number,
                }
            }),
        }
    })
    return apiInfo;
}

//Get info from DataBase
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
//Concat both Database and Api infos
const getAllInfo = async () => {
    const ApiInfo = await getApiInfo();
    const DbInfo = await getDbsInfo();
    const TotalInfo = ApiInfo.concat(DbInfo);
    return TotalInfo;
}

//Get Api by ID
const getApiByID = async () => {
    const apiIDinfo = await axios.get(`https://api.spoonacular.com/recipes/{id}/information?apiKey=${API_KEY}`)
    const apiID = apiIDinfo.data;
    const recipeInfo = {
        id,
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
            steps: ele.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.number,
                }
            }),
    }
    return recipeInfo;
}

//Get DataBase by ID
const getDbByID = async () => {
    return await Recipe.findByPk (id, {
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes:[],
            }
        }
    })
}

module.exports = {
    getApiInfo,
    getDbsInfo,
    getAllInfo,
    getApiByID,
    getDbByID,
}