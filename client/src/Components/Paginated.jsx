import React, { useState } from "react";

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
                                <li key = {place}>
                                    <button onClick={() => currentPage(place)}>{place}</button>
                                </li>
                            })
                        }
                    </ul>
                </nav>
            }
            <button onClick={goFoward()} disabled={totalPages === totalPages.length}> ⮞ </button>
        </div>
    )
}