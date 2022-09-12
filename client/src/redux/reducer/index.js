import { 
    FETCH_DOGS,
    FETCH_TEMPERAMENTS,
    SEARCH_DOGS,
    SORT_NAME,
    SORT_WEIGHT,
    SORT_TEMPERAMENTS,
    GET_DOG_DETAILS
    } from "../actions";
import { ASCENDENTE, MIN } from "../../utils/sort"

const initialState = {
    dogs: [],
    temperaments: [],
    filteredDogs: [],
    dogDetails: [],
}

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case FETCH_DOGS: {
            action.payload.forEach(d => {
                if(d.temperaments.length === 0) {
                    d.temperaments[0] = "No-temperaments"
                }
                if(d.weight[0] === "NaN" || d.weight[0] === "") {
                    d.weight[0] = "Unknown";
                }
                if(d.weight[1] === "NaN" || d.weight[1] === "") {
                    d.weight[1] = "Unknown";
                }
                if(d.height[0] === "NaN" || d.height[0] === "") {
                    d.height[0] = "Unknown";
                }
                if(d.height[1] === "NaN" || d.height[1] === "") {
                    d.height[1] = "Unknown";
                }
                if (d.temperaments[0].name) {
                    d.temperaments = d.temperaments.map(t => t.name)
                }
            });
            return {
                 ...state, 
                 dogs: action.payload,
                 filteredDogs: action.payload,
            }
        }
        case FETCH_TEMPERAMENTS: {
            const temps = action.payload.filter(t => t.name !== "");
            return {
                 ...state, 
                 temperaments: temps,
            }
        }
        case SEARCH_DOGS: {
            return {
                ...state,
                filteredDogs: action.payload,
            }
        }
        case SORT_NAME: {
            let orderedDogs = [...state.dogs];
            orderedDogs.sort((a, b) => {
                if(a.name < b.name) return action.payload === ASCENDENTE ? -1 : 1;
                if(a.name > b.name) return action.payload === ASCENDENTE ? 1 : -1;
                return 0;
            })
            return {
                ...state,
                filteredDogs: orderedDogs,
            }
        }
        case SORT_WEIGHT: {
            let orderedDogs = [...state.dogs];
            orderedDogs.sort((a, b) => {
                if(Number(a.weight[0]) < Number(b.weight[0])) return action.payload === MIN ? -1 : 1;
                if(Number(a.weight[1]) > Number(b.weight[1])) return action.payload === MIN ? 1 : -1;
                return 0;
            })
            return {
                ...state,
                filteredDogs: orderedDogs,
            }
        }
        case SORT_TEMPERAMENTS: {
            let dogs = [...state.dogs];
            let dogsByTemp = [];
            if(action.payload === "all") {
                dogsByTemp = dogs;
            } else {
                for (let i = 0; i < dogs.length; i++) {
                    let found = dogs[i].temperaments.find(t => t === action.payload);
                    if(found) dogsByTemp.push(dogs[i]);                    
                }
                for(let i = 0; i < dogs.length; i++) {
                    if(dogs[i].temperaments[0].name) {
                        console.log(dogs[i].temperaments[0].name)
                    }
                }
            }   
            return {
                ...state,
                filteredDogs: dogsByTemp,
            }
        }
        case GET_DOG_DETAILS: {
            let details = action.payload[0];
            if(!details.temperaments) {
                details.temperaments = "No-temperaments";
            }
            if (details.temperaments.length <= 0) {
                details.temperaments[0] = "No-temperaments";
            }
            if (details.temperaments[0].name) {
                details.temperaments = details.temperaments.map(t => t.name)
            }
            if(details.weight[0] === "NaN" || details.weight[0] === "") {
                details.weight[0] = "Unknown";
                details.minWeight = details.weight[0];
            } else {
                details.minWeight = details.weight[0];
            }
            if(details.weight[1] === "NaN" || details.weight[1] === "") {
                details.weight[1] = "Unknown";
                details.maxWeight = details.weight[1];
            } else {
                details.maxWeight = details.weight[1];
            }
            if(details.height[0] === "NaN" || details.height[0] === "") {
                details.height[0] = "Unknown";
                details.minHeight = details.height[0];
            } else {
                details.minHeight = details.height[0];
            }
            if(details.height[1] === "NaN" || details.weight[1] === "") {
                details.height[1] = "Unknown";
                details.maxHeight = details.height[1];
            } else {
                details.maxHeight = details.height[1];
            }
            return {
                ...state,
                dogDetails: details,
            }
        }
        default: {
            return state;
        }
    }
}