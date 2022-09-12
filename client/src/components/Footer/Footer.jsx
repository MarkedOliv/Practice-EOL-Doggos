import Github from "../../assets/github-logo.png"
import LinkedIn from "../../assets/linkedin.png"
import styles from "./Footer.module.css"

export default function Pagination() {
    return (
        <footer className={styles.Footer__Container}>
            <div className={styles.Social}>
                <a href="https://github.com/MarkedOliv">
                    <img src={Github} alt="Github from Oliver Marquez" />
                </a>
                <a href="https://www.linkedin.com/in/oliver-marquez-54837621a?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B5xIexxUvRo2R1iMmqMnfbA%3D%3D">
                    <img src={LinkedIn} alt="LinkedIn from Oliver Marquez" />
                </a>
            </div>
            <div className={styles.Credits}>
                <p>Oliver Márquez © 2022</p>
            </div>
        </footer>
        )
}