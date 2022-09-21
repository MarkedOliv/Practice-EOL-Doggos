import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDogDetails, clearDogDetails } from "../../redux/actions";
import styles from "./DogDetail.module.css";


export default function DogDetail () {
    
    const dispatch = useDispatch();
    let { id } = useParams();
    useEffect(() => {
        dispatch(getDogDetails(id));
        return dispatch(clearDogDetails())
    }, [dispatch, id]);

    const details = useSelector(state => state.dogDetails);
    let name, image, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments = []; 
    if(details) {
        name = details.name;
        image = details.image;
        minHeight = details.minHeight;
        maxHeight = details.maxHeight;
        minWeight = details.minWeight;
        maxWeight = details.maxWeight;
        life_span = details.life_span;
        if(details.temperaments) {
            temperaments = [...details.temperaments];
        }
    }
    return (
        <div className={styles.dogDetailContainer}>
            <Link to="/dogs">
                <button className={styles.goBackBtn}>Go back</button>
            </Link>
            <h1 className={styles.dogDetailName}>Name: {name}</h1>
            <img className={styles.dogImg}src={image} alt={"Image of: " + name} />
            <div className={styles.utilContainer}>
                <div className={styles.dogHeightContainer}>
                    <h3 className={styles.dogHeightLabel}>Height: </h3>
                    {
                        minHeight === "NaN"? minHeight = "Unknown" : null
                    }
                    {
                        maxHeight === "NaN"? maxHeight = "Unknown" : null
                    }
                    {
                        minHeight && maxHeight ? <p className={styles.dogHeight}> Min: {minHeight} cm - Max: {maxHeight} cm</p> : <p className={styles.dogHeight}>Weight: {minHeight}</p>  
                    }
                </div>
                <div className={styles.dogWeightContainer}>
                    <h3 className={styles.dogWeightLabel}>Weight: </h3>
                    {
                        minWeight === "NaN"? minWeight = "Unknown" : null
                    }
                    {
                        maxWeight === "NaN"? maxWeight = "Unknown" : null
                    }
                    {
                        minWeight && maxWeight> 1 ? <p className={styles.dogWeight}> Min: {minWeight} kg - Max: {maxWeight} kg</p> : <p className={styles.dogWeight}>{minWeight}</p>  
                    }
                </div>
                <div className={styles.dogLifeSpanContainer}>
                    <h3 className={styles.dogLifeSpanLabel}>Life span:</h3>
                    <p className={styles.dogLifeSpan}>{life_span}</p>
                </div>
            </div>     
                <ul className={styles.dogTemperaments}>
                    Temperaments: 
                    {
                        temperaments?.map(t => <li className={styles.dogTemperamentsEl} key={t}>{t}</li>)
                    }
                </ul>
        </div>
    )
    
}