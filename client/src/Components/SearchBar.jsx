import React from "react";
import { useState } from "react";
import { getRecipeByName } from "../Actions";
import { useDispatch } from "react-redux"; 

export default function searchBar() {
    const dispatch = useDispatch();
    const [ input, setInput] = useState("");

    let handleChange = (event) => {
        event.preventDefault();
        setInput(e.target.value);
        //dispatch(getRecipeByName(input));
    }

    let handleSummit = (event) => {
        event.preventDefault();
        dispatch(getRecipeByName(input));
        setInput("");
    }

    return (
        <div>
            <div>
                <h1>PI FOOD</h1>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={input}
                    onChange={event => handleChange(event)}>
                </input>
            <button
            type="submit"
            onClick={event => handleSummit(event)}>Buscar</button>
            </div>
        </div>
    )
}