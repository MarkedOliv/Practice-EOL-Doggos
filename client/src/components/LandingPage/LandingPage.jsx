import { Link } from "react-router-dom";
import styles from "../LandingPage/LandingPage.module.css";

export default function LandingPage () {
    return (
        <section className={styles.welcome}>
            <h1 className={styles.LandingTitle}>Welcome to Doggos</h1>
            <Link to="/dogs">
                <button className={styles.goBtn}>Go</button>
            </Link>
        </section>
    )
}