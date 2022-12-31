import React, { useEffect} from "react";
import { connect, Connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { createRecipe, getDiet} from "../Actions/index";

const URL = (string) => {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(string);
}

const validName = (string) => {
    let pattern = /^[a-zA-Z\s]+$/;
    return pattern.test(string);
}

const validate = (input) => {
    let errors = [];

    if(!input.name) {
        errors.name = "Tiene que tener un Nombre";
    }

    if(input.name && !validName(input.name)) {
        errors.name = "Nombre Invalido";
    }

    if(!input.summary){
        errors.summary = "Debe tener una descripcion";
    }

    if (input.healthScore < 1 || input.healthScore > 100) {
        errors.healthScore = "Debe ser entre 1 y 100";
    }

    if (!input.image){
        errors.image = "Debe agregar una Imagen";
    }

    if (input.image && !URL(input.image)){
        errors.image = "URL invalido"
    }

    if (!input.steps){
        errors.steps = "Agrege los pasos de la receta";
    }

    if (!input.diet.lenght){
        errors.diet = "Selecione una Dieta"
    }

    if (input.diet && !validName(input.diet)){
        errors.diet = "Dieta Invalida"
    }

    return errors;
}

function createRecipe(props) {
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: "",
        image: "",
        steps: "",
        diets: [],
        diet: "",
    })

    useEffect(() => {
        props.getDiet()
    }, []);

    let handleChange = (event) => {
        event.preventDefault();
        setInput((lastInput) => {
            const newInput = {
                ...lastInput,
                [event.target.name]: event.target.value,
            }
            setErrors(validate(newInput));
            return newInput;
        })
    }

    let handleSummit = (event) =>{
        event.preventDefault();
        if(Object.keys(errors).length === 0 && input.name !== "" && input.summary !== ""){
            if (input.diet){
                input.diet.push(input.diet.toLocaleLowerCase());
            }
            props.createRecipe(input);
            setInput({
                name: "",
                summary: "",
                healthScore: "",
                image: "",
                steps: "",
                diets: [],
                diet: "",
            })
            history.push('/home');
        } else {
            alert ("Revisa los campos");
        }
    }

    let handleCheck = (event) =>{
        let newArray  = input.diets;
        let find = newArray.indexOf(event.target.value);

        if (find >= 0){
            newArray.splice(find, 1);
        } else {
            newArray.push(event.target.value);
        }

        setInput({
            ...input,
            diets: newArray,
        })

        setErrors(validate(input));
    }

    return (
        <div>
            <div>
                <div>
                    <h1>Crear Receta</h1>
                </div>
                <div>
                    <hr></hr>
                </div>
            </div>

            <form>
                <div>
                    <div><label>Name: </label></div>
                    <input
                        type={"text"}
                        name={"name"}
                        value={input.name}
                        onChange={event => handleChange(event)}
                    ></input>
                    {!errors.name ? null : <p>{errors.name}</p>}
                </div>

                <div>
                    <div><label>Summary: </label></div>
                    <input
                        type={"text"}
                        name={"summary"}
                        value={input.summary}
                        onChange={event => handleChange(event)}
                    ></input>
                    {!errors.summary ? null : <p>{errors.summary}</p>}
                </div>

                <div>
                    <div><label>healthScore: </label></div>
                    <input
                        type={"number"}
                        name={"healthScore"}
                        value={input.healthScore}
                        onChange={event => handleChange(event)}
                    ></input>
                    {!errors.healthScore ? null : <p>{errors.healthScore}</p>}
                </div>

                <div>
                    <div><label>Image: </label></div>
                    <input
                        type={"url"}
                        name={"image"}
                        value={input.image}
                        onChange={event => handleChange(event)}
                    ></input>
                    {!errors.image ? null : <p>{errors.image}</p>}
                </div>

                <div>
                    <div><label>Steps: </label></div>
                    <input
                        type={"text"}
                        name={"steps"}
                        value={input.steps}
                        onChange={event => handleChange(event)}
                    ></input>
                    {!errors.steps ? null : <p>{errors.steps}</p>}
                </div>

                <div>
                    <div><label>Tipos de Dieta: </label></div>
                    <br></br>
                    {props.diets.slice(0, 13).map(d  => {
                        return (
                            <div key={d}>
                                <label> {d[0].toUpperCase() + d.slice(1)} </label>
                                <input type={checkbox} name={d} value={d} onChange={event => handleCheck(event)}></input>
                            </div>
                        )
                    })}
                    {!errors.diets ? null : <p>{errors.diets}</p>}
                </div>

                <div>
                    <div><label>Dieta: </label></div>
                    <input
                        type={"text"}
                        name={"diet"}
                        value={input.diet}
                        onChange={event => handleChange(event)}
                    ></input>
                    {!errors.diet ? null : <p>{errors.diet}</p>}
                </div>

                <br></br>

                <div>
                    <button type="summit"> CREATE</button>
                </div>
                <br></br>
                <div>
                    <Link to="/home"><button>Go back</button></Link>
                </div>
                <br></br>
            </form>
        </div>
    )
    
}

function mapStateToProps(state) {
    return {
        diets: state.diets,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createRecipe: (payload) => dispatch(createRecipe(payload)),
        getDiet: () => dispatch(getDiet()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(createRecipe);