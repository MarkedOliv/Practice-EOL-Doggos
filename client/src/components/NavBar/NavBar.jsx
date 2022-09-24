import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import logo from '../../assets/dog.png';
import styles from './NavBar.module.css';

export default function NavBar ({setCurrentPage}) {
    return (
    <header className={styles.headerContainer}>
        <div className={styles.firstCont}>
            <Link to="/">
                <img src={logo} alt="Logo"></img>
            </Link>
            <SearchBar className={styles.SearchBar}/>

        </div>
        <Link to="/add_dog">
            <button className={styles.CreateDog}>Create Dog</button>
        </Link>
    </header>
    )
}