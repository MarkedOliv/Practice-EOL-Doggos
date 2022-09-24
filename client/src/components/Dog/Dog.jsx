import { Link } from "react-router-dom";
import styles from "./Dog.module.css"

export default function Dog ({ id, image, name, temperaments, weight }) {
    return (
    <div className={styles.dogContainer}>
        <Link to={"/dogs/" + id}>
            <img className={styles.dogImg} src={image} alt={name} />
            <button className={styles.dogName}>{name}</button>
        </Link>
        <div className={styles.dogCard}>
            <ul className={styles.dogTemps}>
            {
                temperaments.map((temps) => <li className={temperaments.length>8 ? `${styles.dogTempsElLarge}` : `${styles.dogTempsEl}`}key={temps+Math.random}>{temps}</li>)
            }
            </ul>
            <div>
                {
                    weight[0] === "NaN"? weight[0] = "Unknown" : null
                }
                {
                    weight.length > 1 ? <p className={styles.dogWeight}>Weight: Min: {weight[0]} kg - Max: {weight[1]} kg</p> : <p className={styles.dogWeight}>Weight: {weight[0]}</p>  
                }
            </div>

        </div>
    </div>)
}