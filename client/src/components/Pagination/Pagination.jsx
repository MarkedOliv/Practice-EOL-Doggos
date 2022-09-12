import { Link } from "react-router-dom";
import styles from "./Pagination.module.css";

export default function Pagination({dogs, dogsPerPage, paginate}) {
    const pageNums = [];
    for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
        pageNums.push(i);
    };
    return (
    <nav className={styles.container}>
        <ul className={styles.listContainer}>
            {
                pageNums && pageNums.map(num => (
                    <li key={num + Math.random()}>
                        <Link to={"/dogs/page/" + num}>
                            <button className={styles.pagNum}type="button" onClick={() => paginate(num)} key={num + Math.random()}>{num}</button>
                        </Link>
                    </li>
                ))
            }
        </ul>
    </nav>
    )
}