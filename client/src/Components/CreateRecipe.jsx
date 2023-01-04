import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiet, getRecipes, clearDetail} from "../Actions/index";
let number = 0;


export default function CreateRecipe(){
    const dispatch = useDispatch();
    const history = useHistory();
    const allRecipes = useSelector(state => state.recipes);
    const dietType = useSelector(state => state.diets);

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

    let validUrl = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;
    function validate(input) {
        let errors = [];
    
        if(!input.name) {
            errors.name = "Enter a correct Name";
        } else if(allRecipes.find((ele) => ele.name.toLowerCase().includes(input.name.toLowerCase()))) {
            errors.name = "That name already exist";
        } else if(input.summary.lenght < 10 || !input.summary){
            errors.summary = "Enter a correct Summary";
        } else if (input.healthScore < 1 || input.healthScore > 100 || !input.healthScore) {
            errors.healthScore = "Enter a correct healthScore";
        } else if (!input.image || !validUrl.test(input.image)){
            errors.image = "Enter a valid URL";
        } else if (input.steps.lenght === 0){
            errors.steps = "Enter valid Recipe Steps";
        } else if (input.diet.lenght < 1){
            errors.diet = "Select at least 1 Diet"
        }
        let result = Object.keys(errors).length > 0? errors: true;
        return result;
    }

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(
            validate({
            ...input,
            [event.target.name]: event.target.value
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
        const error = validate(input);

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
            dispatch(clearDetail());
            dispatch(getRecipes());
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={(event) => handleSummit(event)}>

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
                        <input type="number" value={input.image} name="image" onChange={(event) => handleChange(event)} placeholder="Enter a URL..."/>
                        {errors.image && <h4>{errors.image}</h4>}
                    </div>

                    <div>
                        <label>Steps: </label>
                        <div>
                            <textarea type="text" value={input.steps.step} name="steps" onChange={handleChangeStep} placeholder="Insert a Step..."></textarea>
                            <button type="button" onClick={handleAddStep}>Add Step</button>
                            
                        </div>
                        <div>
                            {input.steps.map((ele, ida) => {
                                return <div>
                                    <p key={ida}>{`${ele.step}`}</p>
                                    </div>
                            })}
                        </div>
                        {errors.steps && <h4>{errors.steps}</h4>}
                    </div>

                    <div>
                        <label>Diets: </label>
                        <div>
                            <select type="text"  onChange={(event) => handleSelect(event)} defaultValue="default">
                                <option disabled value="default" > Select Diets...</option>
                                {dietType?.map((tdiet) => (
                                    <option key={tdiet.id}>{tdiet.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.diet && <h4>{errors.diet}</h4>}
                    </div>

                    <button type="summit">Create Recipe</button>
                </form>
            </div>
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