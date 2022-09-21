import SearchBar from '../SearchBar/SearchBar';
import OrderByName from '../OrderByName/OrderByName';
import OrderByWeight from '../OrderByWeight/OrderByWeight';
import OrderByTemperaments from '../OrderByTemperaments/OrderByTemperaments';
import { Link } from 'react-router-dom';
import logo from '../../assets/dog.png';
import styles from './NavBar.module.css';

export default function NavBar ({setCurrentPage}) {
    return (
    <header className={styles.headerContainer}>
        <Link to="/">
            <img src={logo} alt="Logo"></img>
        </Link>
        <SearchBar className={styles.SearchBar}/>
        <div className={styles.Orders}>
            <OrderByName setCurrentPage={setCurrentPage}/>
            <OrderByWeight setCurrentPage={setCurrentPage}/>
            <OrderByTemperaments setCurrentPage={setCurrentPage}/>
        </div>
        <Link to="/add_dog">
            <button className={styles.CreateDog}>Create Dog</button>
        </Link>
    </header>
    )
}