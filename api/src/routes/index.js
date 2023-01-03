const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipes = require("./recipesRoutes");
const diets = require("./dietRoutes");




/**const recipesRouter = require('./recipesGet');
const dietRouter = require('./dietGet');
const recipeRouter = require('./recipeDB');
**/

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", recipes);
router.use("/diets", diets);



/**router.use('./recipes', recipesRouter);
router.use('./diet', dietRouter);
router.use('./recipe', recipeRouter);
**/

module.exports = router;
