const { Router } = require("express");
const router = Router();
const { Dogs, Temperaments } = require("../../db.js");
const { getAllDogs } = require("./utils.js");

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    const allDogs = await getAllDogs();
    if (name) {
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        dog.length ? res.status(200).send(dog) : res.status(404).send("Dog not found"); 
    } else {
        res.status(200).send(allDogs);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:dogId", async (req, res, next) => {
  try {
    const { dogId } = req.params;
    const allDogs = await getAllDogs();
    const dog = allDogs.filter(dog => dog.id == dogId);
    if (dog.length) {
        res.status(200).json(dog);
    }else{
        res.status(404).send("Can't find that dog");
    }
  } catch (error) {
    next(error);
  } 
});

router.post("/", async (req, res, next) => {
  let {name, min_height, max_height, min_weight, max_weight, life_span, temperaments, image} = req.body;
  const fixedHeight = []
  const minHeight = min_height;
  const maxHeight = max_height;
  fixedHeight.push(minHeight, maxHeight);

  const fixedWeight = []
  const minWeight = min_weight;
  const maxWeight = max_weight;
  fixedWeight.push(minWeight, maxWeight);
  try {
    if(!name || !min_height || !max_height || !min_weight || !max_weight) {
      return res.status(400).json({msg: "Missing data"});
    } else {
      let dog = await Dogs.create({
        name,
        height: fixedHeight,
        weight: fixedWeight,
        life_span,
        image: image ? image : "https://i.ytimg.com/vi/VPZJ_l_IHJ0/maxresdefault.jpg",
      })
  
      let associatedTemp = await Temperaments.findAll({where: { name: temperaments}})
      dog.addTemperaments(associatedTemp);
  
      res.status(200).send("Dog created succesfully!");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;