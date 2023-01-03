const { Router } = require ("express");
const { getAllRecipesInfo, postNewRecipe} = require ("./controllersRoutes");

const router = Router();

//GET recipes/name="...":
router.get("/", async (req, res) => {
    try{
        const {name} = req.query;
        let info = await getAllRecipesInfo();

        if (name) {
            let recipeName = info.filter((r) => r.name.toLowerCase().includes(name.toLowerCase()));
            recipeName.length ?
                res.status(200).send(recipeName):
                res.status(404).send("Recipe not Found");
        } else {
            res.status(200).send(info);
        }
    } catch (error) {
        console.log("Error in route getQueryName")
    }
});

//GET /recipes/{idReceta}:
router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const apiInfo = await getAllRecipesInfo();
        if (id) {
            const recipeByID = apiInfo.find((recipe) => recipe.id == id);
            recipeByID ?
                res.status(200).json(recipeByID):
                res.status(404).json("Not found recipe detail")
        };
    } catch (error) {
        res.status(400).json("Error in route getID recipe", error)
    }
});

// POST /recipes
router.post("/", async (req, res) => {
    const objRecipe = req.body;
    try {
        const postRecipe = await postNewRecipe(objRecipe);
        res.status(201).json(postRecipe);
    } catch (error) {
        res.status(404).json("Error in router Post Recipe", error);
    }
});

module.exports = router;