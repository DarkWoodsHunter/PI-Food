import React from "react";
import { Link } from "react-router-dom";
//import { useDispatch } from "react-redux";


export default function Recipe({id, image, name, healthScore, diets}){
    //const dispatch = useDispatch();

    return (
        <div>
            <Link to={`/home/${id}`}>
                <div>
                    <h3>{name}</h3>
                    <image src={image} alt="Recipe" width="300px"/>
                    <div>
                        <label>Health Score: <span>{healthScore}</span></label>
                    </div>
                    <label>Diets: </label>
                    {diets?.map((tdiet) => (
                        <p key={tdiet}>
                            {tdiet.charAt(0).toUpperCase() + tdiet.slice(1)}
                        </p>
                    ))}
                </div>
            </Link>
        </div>
    )
}