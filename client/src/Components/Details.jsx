import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeByDetail, clearDetail } from "../Actions";




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
            <div>
                {recipeDetail.length < 1 ? (
                    <label>...</label>
                ):
                    <div>
                        <h4><div>Name: </div>{recipeDetail.name}</h4>
                        <img src={recipeDetail.image} alt="Recipe Detail Image" />
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


/**
class Details extends React.Component {
    componentDidMount() {
        this.props.getRecipeByDetail(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearDetail();
    }

    render() {
        const { recipeDetails} = this.props
        return (
            <div key={this.props.match.params.id}>
                {recipeDetails.name ?
                    <div>
                        <div>
                            <h1>{recipeDetails.name}</h1>
                        </div>

                        <div>
                            {
                                recipeDetails.image ? <img src={recipeDetails.image} alt="Img not found."></img>:
                                <img src={"Add default img Link, No te olvides!"} alt="Img not found."></img>
                            }
                        </div>

                        <div>
                            {recipeDetails.summary ?
                            <div>
                                <h3>Summary: </h3>
                                <p>{recipeDetails.summary}</p>
                            </div>:
                            <h5>This recipe does not have a summary</h5>

                            }
                        </div>

                        <div>
                            {recipeDetails.healthScore ?
                            <div>
                                <h3>Health Score: </h3>
                                <h5>{recipeDetails.healthScore}</h5>
                            </div>:
                            <h5>Missing Score</h5>
                            }
                            
                        </div>

                        <div>
                            {recipeDetails.steps ?
                                <div>
                                    <h3>Steps: </h3>
                                    <ul>{Array.isArray(recipeDetails.steps) ? recipeDetails.steps.map(step => {
                                    return (
                                        <p key={step.number}>{step.number}: </p>
                                        )}):
                                    <p>{recipeDetails.steps}</p>
                                    }</ul>
                                </div>:
                                <h5>This recipe doesn't have a step by step</h5>
                            }
                        </div>
                    </div>: <h1> Loading...</h1>
                }

                <div>
                    <Link to="/home"> <button>Home</button></Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        recipeDetails: state.recipeDetails
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getRecipeByDetail: (id) => dispatch(getRecipeByDetail(id)),
        clearDetail: () => dispatch(clearDetail())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details); **/