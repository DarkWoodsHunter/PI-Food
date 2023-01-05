import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipeByDetail, clearDetail } from "../Actions";
import styled from "styled-components";

const MainBlock = styled.div`
    background-image: url("../Images/tea.png");
    background-size: 100% 100%;
    background-position: center;
    width: 100vw;
    height: 100vh;
    background-attachment: fixed;
    overflow: auto;

`
const ButtonConteiner = styled.div`
    position:absolute;
    left: 100px;
    top: 50px;

`
const GoBackButton = styled.button`
    border: none;
    color: rgb(0, 0, 0);
    border-radius: 2em;
    background-color:#347474;
    margin: 5px;
    padding: 5px;
    font-size: 14px;
    z-index: 4;
    &:hover .myButton{
        background-color:#ff7e67;
    }
`
const MainConteiner = styled.div`
    background-color: #35495e;
    position: absolute;
    width: 1500px;
    height: 100%;
    border-radius: 30px;
    left: 200px;
    top: 100px;
    z-index: 3;
`

const tittleDiv = styled.div`
    

`
const SummartDiv = styled.div`
    background-color: #50095e;
    border-radius: 50px;
    padding: 5px;
    margin: auto;
    height: 200px;
    width: 800px;
    
`

const TexttDiv = styled.div`
    background-color: #50095e;
    border-radius: 50px;
    padding: 1px;
    position: relative;
    left: 500px;
    margin: 10px;;
    height: 100%;
    width: 500px;
    
`

const SummaryText = styled.h5`
    color: white;
    font-size: 13;
    font-weight: bold;
`

export default function Details (props){
    const dispatch = useDispatch();
    const myRecipe = useSelector((state) => state.recipeDetails)

    useEffect(() => {
        dispatch(getRecipeByDetail(props.match.params.id))
    },[dispatch])

    

    return (
        <MainBlock>
            <ButtonConteiner>
                <Link to="/home"><GoBackButton className="myButton" type="submit">Go back</GoBackButton></Link>
            </ButtonConteiner>
            <MainConteiner>
            {
                myRecipe.length < 1 ?
                    <div>
                        <label>Loading...</label>
                    </div>:

                    <div>
                        <h4><div>Name: </div>{myRecipe.name}</h4>
                        <img src={myRecipe.image} alt="ImgDetail" width="300px"/>
                        <SummartDiv>
                            <SummaryText><div>Summary: </div>{myRecipe.summary?.replace(/<[^>]*>?/g, "")}</SummaryText>
                        </SummartDiv>

                        <TexttDiv>
                            <SummaryText><div>Health Score: </div>{myRecipe.healthScore}</SummaryText>
                        </TexttDiv>
                        <TexttDiv>
                        <SummaryText><div>Steps: </div>{myRecipe.steps?.map(ele => {
                            return <p key={ele.step}>Step: {ele.number}: {ele.step}</p>
                        })}</SummaryText>
                        </TexttDiv>
                        <TexttDiv>
                        <SummaryText><div>Diet: </div>{myRecipe.diets?.map((tdiet) => {
                            return <span key={tdiet}>{tdiet}</span>
                        })}</SummaryText>
                        </TexttDiv>
                    </div>
                    
                
            }
            </MainConteiner>
        </MainBlock>
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