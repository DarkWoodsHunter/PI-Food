const { Router } = require("express");
const { DietTypes} = require("../Controllers/diet")
const { Diet } = require("../db")

const router = Router();

//GET /diets:
router.get('/', async(req,res) => {
    try{
        DietTypes.forEach(async ele => {
            await Diet.findOrCreate({
                where: {
                    name: ele,
                }
            })
        });
        const diets = await Diet.findAll();
        res.status(200).send(diets);
    }
    catch (error){
        return res.status(400).send(error);
    }
})

module.exports = router;