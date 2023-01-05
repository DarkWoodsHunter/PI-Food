import React from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { paginatedAction } from "../Actions";


export default function Paginated ({recipesPerPage, allRecipes, paginado}) {
    /**
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes)
    const recipePerPage = useSelector(state => state.recipePerPage)
    //const currentPage = useSelector(state => state.currentPage)
    const allRecipes = recipes?.length;
    **/
    const pageNumbers = [];
    
    /**
    const handlePaginated = (event) => {
        dispatch(paginatedAction(parseInt(event.target.innerHTML)))
    }
    **/
    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul>
                {pageNumbers?.map((current) => {
                    return <li className="current" key={current}>
                        <a onClick={() => paginado(current)} key={current}>{current}</a>
                    </li>
                })}
            </ul>
        </div>
    )
}

/**
export default function paginated({recipesPage, allRecipes, paged, setPage, page}) {
    const [input, setInput] = useState;

    const goBack = () => {
        setInput(parseInt(input) - 1);
        setPage(parseInt(input) - 1)
    }

    const goFoward = () => {
        setInput(parseInt(input) + 1);
        setPage(parseInt(input) + 1)
    }

    const currentPage = (current) => {
        setInput(parseInt(current));
        paged(current)
    }

    const totalPages = [];

    for (let i = 1; i <= Math.ceil(allRecipes / recipesPage); i++) {
        totalPages.push(i)
    };

    return (
        <div>
            <button onClick={goBack()} disabled={page <= 1}> ⮜ </button>
            {
                <nav>
                    <ul>
                        {
                            totalPages?.map((place) => {
                                return(
                                    <li key = {place}>
                                    <button onClick={() => currentPage(place)}>{place}</button>
                                    </li>
                                )})
                        }
                    </ul>
                </nav>
            }
            <button onClick={goFoward()} disabled={totalPages === totalPages.length}> ⮞ </button>
        </div>
    )
} **/