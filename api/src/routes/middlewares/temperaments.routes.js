const { Router } = require("express");
const router = Router();
const { getAllTemperaments } = require("./utils.js")


router.get("/", async (req, res, next) => {
  try {
      const allTemp = await getAllTemperaments();
      res.send(allTemp);
  } catch (error) {
    next(error);
  }
});

module.exports = router;