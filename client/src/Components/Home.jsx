import React from "react";
import { Link } from "react-router-dom";
import Recipe from "./Recipe";
import SearchBar from "./SearchBar";
import Paginated from "./Paginated";
import { useState, useEffect} from "react";
import { getRecipes, filterbyDiet, orderByAlphabet, orderByScore } from "../Actions/index";
import { connect } from "react-redux";



function Home (props){

    //Show 9 recipes per page
    const [page, setPage] = useState(1);
    const recipePage = 9;
    const totalRecipes = page * recipePage;
    const firstRecipe = totalRecipes - recipePage;
    const showRecipes = props.allRecipes.slice(firstRecipe, totalRecipes);

    const currentPage = function(pageNumber){
        setPage(pageNumber);
    };

    useEffect(() => {
        props.getRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.getRecipes])

    let handleClick = (event) => {
        event.preventDefault();
        props.getRecipes();
    }
    let handleFilterDiet = (event) => {
        event.preventDefault();
        props.filterbyDiet(event.target.value);
    }

    let hangleOrderAlphabet = (event) => {
        event.preventDefault();
        props.orderByAlphabet(event.target.value);
    }

    let handleOrderScore = (event) => {
        event.preventDefault();
        props.orderByScore(event.target.value);
    }

    return(
        <div>
            <SearchBar/>
            
            <div>
                <Link to="/recipe">
                    <button>Create Recipe</button>
                </Link>
            </div>

            <div>
                <select defaultValue={'all'} name='diets' onChange={event => handleFilterDiet(event)}>
                    <option value="all">All</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto vegetarian">Lacto Vegetarian</option>
                    <option value="ovo vegetarian">Ovo Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleo">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Low fodmap</option>
                    <option value="whole 30">Whole 30</option>
                </select>
            </div>

            <div>
                <select defaultValue={'DEFAULT'} name='Alphabetical' onChange={event => hangleOrderAlphabet(event)}>
                    <option value="DEFAULT" disabled> Alphabetical Order</option>
                    <option value="atoz">A to Z</option>
                    <option value="No atoz">Z to A</option>
                </select>
            </div>

            <div>
                <select defaultValue={'DEFAULT'} name='numerical' onChange={event => handleOrderScore}>
                    <option value="DEFAULT" disabled> Order by Health Score</option>
                    <option value="asc">Lower to Higher</option>
                    <option value="desc">Higher to Lower</option>
                </select>
            </div>
            <button onClick={handleClick()}>Clear</button>

            {
                props.allRecipes.length === 0 ?
                <div>
                    <h5>Loading...</h5>
                </div>:
                <div>
                    {
                        showRecipes?.map(recipe => {
                            return (
                                <div>
                                    <Recipe
                                        id={recipe.id}
                                        image={recipe.image}
                                        name={recipe.name} 
                                        healthScore={recipe.healthScore} 
                                        diets={recipe.diets}
                                        key={recipe.id}
                                    ></Recipe>
                                </div>
                            )
                        })
                    }
                </div>
            }
            <hr></hr>
            <div>
                <Paginated recipesPage={recipePage} allRecipes={props.allRecipes.length} paged={currentPage} setPage={setPage} page={page}></Paginated>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        allRecipes: state.allRecipes,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRecipes: () => dispatch(getRecipes()),
        filterbyDiet: (payload) => dispatch(filterbyDiet(payload)),
        orderByAlphabet: (payload) => dispatch(orderByAlphabet(payload)),
        orderByScore: (payload) => dispatch(orderByScore(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)