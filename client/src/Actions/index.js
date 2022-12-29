import axios from "axios";

export function getRecipes() {
    return async function(dispatch){
        try {
            const res = await axios.get(`/recipes`);
            return dispatch({
                type: 'GET_RECIPES',
                payload: res.data,
            });
        } catch (error){
            console.log(error);
        }
    }
};

export function getRecipeByName(name) {
    return async function(dispatch){
        try {
            const res = await axios.get(`/recipes/?name=${name}`)
            return dispatch({
                type: "GET_RECIPE_BY_NAME",
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
                type: "GET_RECIPE_DETAILS",
                payload: res.data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDiet() {
    return async function(dispatch){
        try{
            const res = await axios.get(`/types`)
            return dispatch({
                type: "GET_DIET",
                payload: res.data.map(dat => dat.name),
            })
        } catch (error) {
            console.log(error);
        }
    } 
}

export function filterbyDiet(payload) {
    return {
        type: "FILTER_BY_DIET",
        payload,
    }
};

export function orderByAlphabet(payload) {
    return {
        type: "ORDER_BY_ALPHABET",
        payload,
    }
};

export function orderByScore(payload) {
    return {
        type: "ORDER_BY_SCORE",
        payload, 
    }
}

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

export function clearDetail() {
    return {
        type: "CLEAR_DETAIL"
    }
}