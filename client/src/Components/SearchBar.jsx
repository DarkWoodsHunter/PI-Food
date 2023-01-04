import React from "react";
import { useState } from "react";
import { getRecipeByName } from "../Actions";
import { useDispatch } from "react-redux";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    let handleChange = (event) => {
        event.preventDefault();
        setInput(event.target.value);
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
                <input type="search" placeholder="Search Recipe" value={input} onChange={event => handleChange(event)}/>
                <button type="submit" onClick={event => handleSummit(event)}>Buscar</button>
            </div>
        </div>
    )
}