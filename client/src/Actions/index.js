import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS";
export const GET_DIET = "GET_DIET";
export const POST_RECIPE = "POST_RECIPE"
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const ORDER_BY_ALPHABET = "ORDER_BY_ALPHABET";
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
//export const CREATE_RECIPE = "CREATE_RECIPE";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CLEAR_RECIPES = "CLEAR_RECIPES";
export const PAGINATED_ACTION = "PAGINATED_ACTION";



export function getRecipes() {
    return async function(dispatch){
        try {
            const res = await axios.get("/recipes");
            return dispatch({
                type: GET_RECIPES,
                payload: res.data,
            });
        } catch (error){
            console.log("error in Action getRecipes");
        }
    }
};
//-----SEARCH BAR
export function getRecipeByName(name) {
    return async function(dispatch){
        try {
            const res = await axios.get(`/recipes/?name=${name}`)
            return dispatch({
                type: GET_RECIPE_BY_NAME,
                payload: res.data,
            });
        } catch(error) {
            alert("No se encuentra la receta");
        }
    }
}

export function getRecipeByDetail(detail) {
    return async function(dispatch){
        try{
            const res = await axios.get(`/recipes/${detail}`)
            return dispatch({
                type: GET_RECIPE_DETAILS,
                payload: res.data,
            })
        } catch (error) {
            console.log("Error in Action getRecipeByDetail", error);
        }
    }
}

//-----Formulario
export function getDiet() {
    return async function(dispatch){
        try{
            const res = await axios.get("/diets")
            return dispatch({
                type: GET_DIET,
                payload: res.data,
            })
        } catch (error) {
            console.log("Error in Actions getDiet",error);
        }
    } 
}

export function postRecipe(payload){
    return async function (){
        try{
            const newRecipe = await axios.post("/recipes", payload);
            return newRecipe;
        } catch (error) {
            console.log("Error in Actions postRecipe", error)
        }
    }
}

//-----Filtrado
export function filterbyDiet(payload) {
    return {
        type: FILTER_BY_DIET,
        payload,
    }
};


//-----Ordenamiento
export function orderByAlphabet(payload) {
    return {
        type: ORDER_BY_ALPHABET,
        payload,
    }
};

export function orderByScore(payload) {
    return {
        type: ORDER_BY_SCORE,
        payload, 
    }
}
/**
export function createRecipe(payload) {
    return async function(dispatch){
        try {
            let res = await axios.post(`/recipe`, payload);
            return dispatch({
                type: "CREATE_RECIPE",
                payload: res,
            })
        } catch (error){
            console.log(error);
        }
    }
}
**/

export function clearDetail() {
    return {
        type: CLEAR_DETAIL
    }
}

export function clearRecipes() {
    return {
        type: CLEAR_RECIPES,
        payload: []
    }
}

export function paginatedAction(payload) {
    return {
        type: PAGINATED_ACTION,
        payload,
    };
}