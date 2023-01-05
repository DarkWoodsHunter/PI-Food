import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipeByDetail, clearDetail } from "../Actions";

export default function Details (props){
    const dispatch = useDispatch();
    const myRecipe = useSelector((state) => state.recipeDetails)

    useEffect(() => {
        dispatch(getRecipeByDetail(props.match.params.id))
    },[dispatch])

    

    return (
        <div>
            <div>
                <Link to="/home"><button type="submit">Go back</button></Link>
            </div>
            {
                myRecipe.length < 1 ?
                    <div>
                        <label>Loading...</label>
                    </div>:

                    <div>
                        <h4><div>Name: </div>{myRecipe.name}</h4>
                        <img src={myRecipe.image} alt="ImgDetail" width="300px"/>
                        <h5><div>Summary: </div>{myRecipe.summary?.replace(/<[^>]*>?/g, "")}</h5>
                        <h4><div>Health Score: </div>{myRecipe.healthScore}</h4>
                        <h4><div>Steps: </div>{myRecipe.steps?.map(ele => {
                            return <p key={ele.step}>Step: {ele.number}: {ele.step}</p>
                        })}</h4>
                        <h4><div>Diet: </div>{myRecipe.diets?.map((tdiet) => {
                            return <span key={tdiet}>{tdiet}</span>
                        })}</h4>
                    </div>
                    
                
            }
        </div>
    )
}

/**
export default function Details(props) {
    const { id } = useParams()
    const dispatch = useDispatch();
    const recipeDetail = useSelector(state => state.recipeDetail)

    useEffect(() => {
        dispatch(getRecipeByDetail(id));
        dispatch(clearDetail())
    }, [dispatch, id])

    return (
        <div>

        </div>
    )
 
    return (
        <div>
            <div>
                
                {recipeDetail.length < 1 ? (
                    <label>...</label>
                ):
                    <div>
                        <h4><div>Name: </div>{recipeDetail.name}</h4>
                        <img src={recipeDetail.image} alt="ImgDetail" />
                        <h5><div>Summary: </div>{recipeDetail.summary?.replace(/<[^>]*>?/g, "")}</h5>
                        <h4><div>Health Score: </div>{recipeDetail.healthScore}</h4>
                        <h4><div>Steps: </div>{recipeDetail.steps?.map(ele => {
                            return <p key={ele.step}>Step: {ele.number}: {ele.step}</p>
                        })}</h4>
                        <h4><div>Diet: </div>{recipeDetail.diets?.map((tdiet) => {
                            return <span key={tdiet}>{tdiet}</span>
                        })}</h4>
                    </div>
                }
            </div>
        </div>
    )
    
}
**/