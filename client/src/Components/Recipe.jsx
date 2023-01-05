import React from "react";
import { Link } from "react-router-dom";
//import { useDispatch } from "react-redux";
import styled from "styled-components";


const CardDiv = styled.div`
    background-color: #ff7e67;
    width: 340px;
    height: 600px;
    border-radius: 20px;
    transition: all 0.3s;
    margin: 0px 45px 45px 45px;
    float: left;
    -webkit-text-fill-color: rgb(43, 43, 43);
    -webkit-text-stroke: 0.5px rgb(75, 71, 71);
    box-shadow: 0rem 0.1875rem 0.375rem rgb(68, 63, 53);
`
const StyledTittle = styled.h3`
    margin-top: 5px;
    margin-bottom: 14px;
    margin-left: 1px;
    font-weight: 600;
    color: white;
`

export default function Recipe({id, image, name, healthScore, diets}){
    //const dispatch = useDispatch();

    return (
        <div>
            <Link to={`/home/${id}`}>
                <CardDiv>
                    <StyledTittle>{name}</StyledTittle>

                    <img src={image} alt="Receta" width="300px"/>

                    <div>
                        <label>Health Score: <span>{healthScore}</span></label>
                    </div>
                    <label>Diets: </label>
                    {diets?.map((tdiet) => (
                        <p key={tdiet}>
                            {tdiet.charAt(0).toUpperCase() + tdiet.slice(1)}
                        </p>
                    ))}
                </CardDiv>
            </Link>
        </div>
    )
}