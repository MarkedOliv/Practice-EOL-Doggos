import axios from "axios";
export const FETCH_DOGS = "FETCH_DOGS";
export const FETCH_TEMPERAMENTS = "FETCH_TEMPERAMENTS";
export const SEARCH_DOGS = "SEARCH_DOGS";
export const SORT_NAME = "SORT_NAME";
export const SORT_WEIGHT = "SORT_WEIGHT";
export const SORT_TEMPERAMENTS = "SORT_TEMPERAMENTS";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const CLEAR_DOG_DETAILS = "CLEAR_DOG_DETAILS";

export function fetchDogs () {
    return function ( dispatch ) {
        axios.get("/api/dogs")
        .then((dogs) => {
            dispatch({
                type: FETCH_DOGS,
                payload: dogs.data,
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
export function fetchTemperaments () {
    return function ( dispatch ) {
        axios.get("/api/temperaments")
        .then((temperaments) => {
            dispatch({
                type: FETCH_TEMPERAMENTS,
                payload: temperaments.data,
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
export function searchDogs (search) {
    return function ( dispatch ) {
        axios.get("/api/dogs?name=" + search)
        .then((dogs) => {
            dispatch ({
                type: SEARCH_DOGS,
                payload: dogs.data,
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function sortName(order) {
    return {
        type: SORT_NAME,
        payload: order,
    }
}

export function sortWeight(order) {
    return {
        type: SORT_WEIGHT,
        payload: order,
    }
}

export function sortTemperament(temperament) {
    return {
        type: SORT_TEMPERAMENTS,
        payload: temperament,
    }
}

export function getDogDetails(id) {
    return async function (dispatch) {
        try {
            var details = await axios.get("api/dogs/" + id)
            return dispatch({
                type: GET_DOG_DETAILS,
                payload: details.data
            })
        }
         catch (error) {
            console.log(error)
        }
    }
}
export function clearDogDetails() {
    return function (dispatch) {
        return dispatch({
            type: CLEAR_DOG_DETAILS,
        })
    }
}
export function createDog(dog) {
    return async function () {
        const data = await axios.post("/api/dogs", dog)
        return data;
    }
}