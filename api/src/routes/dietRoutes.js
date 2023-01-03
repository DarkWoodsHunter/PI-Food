const { Router } = require("express");
const axios = require("axios");
const {getBDdietInfo} = require ("./controllersRoutes");

const router = Router;

//GET /diets
router.get("/", async (req, res) => {
    try {
        const infoDB = await getBDdietInfo();
        res.status(200).send(infoDB);
    } catch (error) {
        res.status(404).json("Error in route getDiet");
    }
});

module.exports = router;