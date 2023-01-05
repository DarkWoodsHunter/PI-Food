import React from "react";
import styled from "styled-components";
//import { useDispatch, useSelector } from "react-redux";
//import { paginatedAction } from "../Actions";

const NavDiv = styled.div`
    position: absolute;
    left: 800px;
    top: 200px;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
    margin-bottom: 20px;
`

const ListAll = styled.li`
    border-radius: 5px;
    border: none;
    background: rgba(255, 236, 236, 0.8);
    color: hsl(0, 0%, 0%);
    margin: 2px;
    margin-block-end: 10px;
    font-size: 17px;
    display: inline;
    align-items: flex-start;
    justify-content: end;
    cursor: pointer;
    box-shadow: 0rem 0.1875rem 0.375rem rgb(68, 63, 53);
`

const StyledText = styled.a`
    font-size: 12px;
    font-weight: bold;
    padding: 3px;
`

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
        <NavDiv>
            <ul>
                {pageNumbers?.map((current) => {
                    return <ListAll className="current" key={current}>
                        <StyledText onClick={() => paginado(current)} key={current}>{current}</StyledText>
                    </ListAll>
                })}
            </ul>
        </NavDiv>
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