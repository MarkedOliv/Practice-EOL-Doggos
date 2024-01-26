const axios = require("axios");

const { Dogs, Temperaments } = require("../../db.js");
const { API_KEY } = process.env;

let apiDogs = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const processDogData = (dog) => {

  const temperamentArray = dog.temperament ? dog.temperament.split(", ") : [];
  const heightArray = dog.height.metric ? dog.height.metric.split(" - ") : [];
  const weightArray = dog.weight.metric ? dog.weight.metric.split(" - ") : [];

  return {
    id: dog.id,
    name: dog.name,
    height: heightArray,
    weight: weightArray,
    temperaments: temperamentArray,
    life_span: dog.life_span,
    image: dog.image.url,
  };
};

const getApiData = async () => {
  try {
    const apiData = await axios.get(apiDogs);
    const dogData = [];
    
    for(const dog of apiData.data) {
      const processedDog = processDogData(dog);
      dogData.push(processedDog);
    }

    return dogData;
  } catch (error) {
    console.error("Error obtaining API data:", error.message)
    throw error;
  }
};

const getFromDb = async () => {
  return await Dogs.findAll({
    include: {
      model: Temperaments,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  const dataFromApi = await getApiData();
  const dataFromDb = await getFromDb();
  const allDataMixed = [...dataFromApi, ...dataFromDb];
  return allDataMixed;
};

const getAllTemperaments = async () => {
  const temperamentsApi = await axios.get(apiDogs);
  const temperaments = temperamentsApi.data.map((t) => t.temperament);
  const temps = temperaments.toString().split(",");
  temps.forEach((t) => {
    let i = t.trim();
    Temperaments.findOrCreate({ where: { name: i } });
  });
  const allTemp = await Temperaments.findAll();
  return allTemp;
};

module.exports = {
  getAllDogs,
  getAllTemperaments,
};
