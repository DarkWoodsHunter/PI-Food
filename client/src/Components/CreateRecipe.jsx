import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiet, clearDetail, getRecipes} from "../Actions/index";
import styled from "styled-components";
var number = 0;

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

const ButtonConteiner = styled.div`
    position:absolute;
    left: 100px;
    top: 50px;

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
    display: flex;
  justify-content: center;
`

const StyledForm = styled.form`
    display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  color: rgb(43, 43, 43);
  margin-top: 30px;
  width: 600px;
  background-color: rgba(248, 179, 100);
  border-radius: 5px;
  border: solid rgb(231, 224, 224) 2px;
  box-shadow: 0 0 4px #000000a8;
  margin-bottom: 55px;
  max-width: 80%;
`

const EleConteiner = styled.div`
    background-color: #347474;
`

export default function CreateRecipe(){
    const dispatch = useDispatch();

    const dietType = useSelector((state) => state.dietType);

    const history = useHistory();
    const allRecipes = useSelector(state => state.recipes);
    

    const [instructions, setInstructions] = useState("");

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: "",
        image: "",
        steps: [],
        diets: [],
    })

    useEffect(() => {
        dispatch(getDiet())
    }, [dispatch]);

    

    const handleChange = (event) => {
        setInput({
          ...input,
          [event.target.name]: event.target.value
        })
        setErrors(
          validate({
            ...input,
            [event.target.name]: event.target.value,
          })
        );
      }

    const handleChangeStep = (event) => {
        const value = event.target.value;
        setInstructions(value);
    };

    const handleAddStep = (event) => {
        if (instructions){
            setInput({
                ...input,
                steps: [...input.steps, { num: number++, step: `Step ${number}: ${instructions}`}]
            });
            setErrors(
                validate({
                    ...input,
                    [event.target.name]: event.target.value,
                })
            );
            setInstructions("");
        }
    }

    const handleSelect = (event) => {
        setInput({
            ...input,
            diets: [...new Set([...input.diets, event.target.value])]
        })
        setErrors(
            validate({
                ...input,
                [event.target.name]: event.target.value
            })
        );
    }

    const handleSummit = (event) => {
        event.preventDefault();
        setErrors(validate(input));
        let error = validate(input);

        if (Object.values(error).length !== 0) {
        } else {
            dispatch(postRecipe(input));
            setInput({
                name: "",
                summary: "",
                healthScore: "",
                image: "",
                steps: [],
                diets: [],
            });
            history.push("/home");
            alert("Recipe Create succesfuly")
            dispatch(clearDetail());
            dispatch(getRecipes());
        }
    }

    let validateUrl = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;


    function validate(input) {
        let errors = {};

    if (!input.name.trim()) {
      errors.name = "Enter a correct name";
    } else if (
      allRecipes.find((e) => e.name.toLowerCase().trim().includes(input.name.toLowerCase().trim()))
    ) {
      errors.name = `The ${input.name} already exists`;
    } else if (
      input.summary.length < 10 ||
      input.summary.trim() === ""
    ) {
      errors.summary = "Enter a correct summary";
    } else if (input.healthScore === "" || input.healthScore < 1 || input.healthScore > 100) {
      errors.healthScore = "Enter a correct health score";
    } else if (input.steps.length === 0) {
      errors.steps = "Enter a correct steps"
    } else if (!input.image || !validateUrl.test(input.image)) {
      errors.image = "This is not a valid URL";
    } else if (input.diets.length < 1) {
      errors.diets = "Select one or more diets";
    } else if (input.diets.length > 4) {
      errors.diets = "Your recipe can not have more than 4 diets!";
    }
    let result = Object.keys(errors).length > 0 ? errors : true;
    return result;
  }

    return (
        <div>
            <ButtonConteiner>
                <Link to="/home"><GoBackButton>Home</GoBackButton></Link>
            </ButtonConteiner>
            <MainConteiner>
                <StyledForm onSubmit={(event) => handleSummit(event)}>

                    <div>
                        <h2>Create your Recipe</h2>
                    </div>

                    <div>
                        <label>Name: </label>
                        <input type="text" value={input.name} name="name" onChange={(event) => handleChange(event)} placeholder="Insert Name..."/>
                    </div>

                    <div>
                        <label>Summary: </label>
                        <textarea type="text" value={input.summary} name="summary" onChange={(event) => handleChange(event)} placeholder="Insert Summary..."/>
                        {errors.summary && <h4>{errors.summary}</h4>}
                    </div>

                    <div>
                        <label>Health Score: </label>
                        <input type="number" value={input.healthScore} name="healthScore" onChange={(event) => handleChange(event)} placeholder="Insert a number between 1 and 100"/>
                        {errors.healthScore && <h4>{errors.healthScore}</h4>}
                    </div>

                    <div>
                        <label>Image: </label>
                        <input type="text" value={input.image} name="image" onChange={(event) => handleChange(event)} placeholder="Enter a URL..."/>
                        {errors.image && <h4>{errors.image}</h4>}
                    </div>

                    <div>
                        <label>Steps: </label>
                        <div>
                            <textarea type="text" value={input.steps.step} name="steps" onChange={handleChangeStep} placeholder="Insert a Step..."></textarea>
                        </div>
                        <div>
                            <button type="button" onClick={handleAddStep}>Add Step</button>    
                        </div>
                        <div>
                            {input.steps.map((object, i) => {
                                return( 
                                        <li key={i}>{`${object.step}`}</li>
                            )})}
                        </div>
                        {errors.steps && <h4>{errors.steps}</h4>}
                    </div>

                    <div>
                        <label>Diets: </label>
                        <div>
                            <select type="text" onChange={(event) => handleSelect(event)} defaultValue="default">
                                <option disabled value="default" > Select Diets...</option>
                                
                                {dietType?.map((tdiet) => (
                                    <option value={tdiet.name} key={tdiet.id}>{tdiet.name}</option>
                                ))}
                            </select>
                            <div>
                                {input.diets.map((tdiet) => (
                                    <div key={tdiet}>
                                        <div><h4>{tdiet}</h4></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {errors.diet && <h4>{errors.diet}</h4>}
                    </div>

                    <button type="summit">Create Recipe</button>
                </StyledForm>
            </MainConteiner>
        </div>
    )

}

/**
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



function CreateRecipe(props) {
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
                                <input type="checkbox" name={d} value={d} onChange={event => handleCheck(event)}></input>
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


export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);**/