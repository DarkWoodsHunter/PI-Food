import { GET_RECIPES, GET_RECIPE_BY_NAME, GET_RECIPE_DETAILS, GET_DIET, POST_RECIPE, FILTER_BY_DIET, ORDER_BY_ALPHABET, ORDER_BY_SCORE, CLEAR_DETAIL, CLEAR_RECIPES } from "../Actions/index";

const initialState = {
    recipes: [],
    allRecipes: [],
    dietType: [],
    recipeDetails: [],
}

function rootReducer (state = initialState, action){
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
            }
        case GET_RECIPE_BY_NAME:
            return {
                ...state,
                recipes: action.payload,
            }
        case GET_RECIPE_DETAILS:
            return {
                ...state,
                recipeDetails: action.payload,
            }
        case GET_DIET:
            return {
                ...state,
                dietType: action.payload,
            }
        case FILTER_BY_DIET:
            const allRecipes = state.allRecipes;
            const filterByDiet = action.payload === 'default' ? allRecipes : allRecipes.filter((recipe) => recipe.diets?.includes(action.payload)); //action.payload === 'default' ? allRecipes : allRecipes.filter(ele => ele.status === action.payload)//(r => r.dietType?.some(diet => diet.toLowerCase() === action.payload.toLowerCase()));
            return {
                ...state,
                recipes: filterByDiet,
            }

        case ORDER_BY_ALPHABET:
           let orderAlphabet = action.payload === 'atoz' ?
            state.recipes.sort(function(a,b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            }):
            state.recipes.sort(function(a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
            }); 
            return {
                ...state,
                recipes: orderAlphabet,
            }

        case ORDER_BY_SCORE:
            let sortScore = action.payload === 'asc' ? 
                state.recipes.sort(function(a,b) {
                    if (a.healthScore < b.healthScore) return -1;
                    if (a.healthScore > b.healthScore) return 1;
                    return 0;
                }):
                state.recipes.sort(function(a,b) {
                    if (a.healthScore < b.healthScore) return 1;
                    if (a.healthScore > b.healthScore) return -1;
                    return 0;
                });
            return {
                ...state,
                recipes: sortScore,
            }
            
        case POST_RECIPE:
            return {
                ...state,
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                recipeDetails: [],
            }

        case CLEAR_RECIPES:
            return{
                ...state,
                recipes: action.payload,
            }
        default: 
            return state;

    }

}

export default rootReducer; 