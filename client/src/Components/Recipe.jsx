import React from "react";
import { Link } from "react-router-dom";


export default function Recipe ({id, image, name, healthScore, diets}) {
    return (
        <div>
            <link to={`/home/${id}`}>
                <div>
                    <img src={image} alt="Receta" width="300px"/>
                    <h3>{name}</h3>
                    <div>
                        <label>HealthScore: <span>{healthScore}</span></label>
                    </div>
                    <label>Diets: </label>
                    {
                        diets?.map((diet) => (
                            <p key={diet}>
                                {diet.charAt(0).toUpperCase() + diet.slice(1)}
                            </p>
                        ))
                    }

                </div>
            </link>
        </div>
    )

}