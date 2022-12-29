const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipesRouter = require('./recipesGet');
const dietRouter = require('./dietGet');
const recipeRouter = require('./recipeDB');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('./recipesGet', recipesRouter);
router.use('./dietGet', dietRouter);
router.use('./recipeDB', recipeRouter);

module.exports = router;
