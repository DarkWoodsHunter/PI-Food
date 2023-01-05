import React from "react";
import { useState } from "react";
import { getRecipeByName } from "../Actions";
import { useDispatch } from "react-redux";
import styled from "styled-components";


const TopBar = styled.div`
    background-color: #35495e;
    padding: 30px;
`

const Searchbartitle = styled.h1`
    color: white;
    position: absolute;
    left: 50px;
    top: -18px;
    padding: 0px;
`
const Barra = styled.div`
    color: white;
    position: absolute;
    left: 1600px;
    top: 18px;
    padding: 0px;
`

const Searcher = styled.input`
    border: none;
    border-radius: 10px;
    border: 3px solid #555;
`

const SearcherButton =styled.button`
    border: none;
    border-radius: 10px;
`

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

            <TopBar>
                <Searchbartitle>PI FOOD</Searchbartitle>
                <Barra>
                    <Searcher type="search" placeholder="Search Recipe" value={input} onChange={event => handleChange(event)}/>
                    <SearcherButton type="submit" onClick={event => handleSummit(event)}>Search</SearcherButton>
                </Barra>
            </TopBar>
        </div>
    )
}