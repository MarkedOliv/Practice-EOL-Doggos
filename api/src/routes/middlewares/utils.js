const axios = require("axios");
const { Dogs, Temperaments } = require("../../db.js");
const { API_KEY } = process.env;
let apiDogs = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getApiData = async() => {
    
    const apiData = await axios.get(apiDogs);
    const apiInfo = await apiData.data.map(dog => {
    let temperamentArray = [];
    if (dog.temperament) {
        temperamentArray = dog.temperament.split(", ");
    }
    
    let heightArray = [];
    if (dog.height.metric) {
        heightArray = dog.height.metric.split(" - ");
    }

    let weightArray = [];
    if (dog.weight.metric) {
        weightArray = dog.weight.metric.split(" - ");
    }
        return {
            id: dog.id,
            name: dog.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temperamentArray,
            life_span: dog.life_span,
            image: dog.image.url,
        }
    })
return apiInfo;
}

const getFromDb = async () => {
    return await Dogs.findAll({
        include: {
            model: Temperaments,
            attributes: ['name'],
            through: {
            attributes: [],
            },
        }
    })
};

const getAllDogs = async () => {
    const dataFromApi = await getApiData();
    const dataFromDb = await getFromDb();
    const allDataMixed = [...dataFromApi, ...dataFromDb];
    return allDataMixed;
};

const getAllTemperaments = async () => {
    const temperamentsApi = await axios.get(apiDogs);
    const temperaments = temperamentsApi.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(t => {
        let i = t.trim()
        Temperaments.findOrCreate({where: { name: i }});
    });
    const allTemp = await Temperaments.findAll();
    return allTemp;  
};

module.exports = {
    getAllDogs,
    getAllTemperaments,
}