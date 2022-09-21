import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { fetchDogs, fetchTemperaments } from "../../redux/actions";
import Dog from "../Dog/Dog";
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import styles from "./Dogs.module.css";

export default function Dogs () {
    let dogs = useSelector((state) => state.filteredDogs);
    let dispatch = useDispatch();
    
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
    const lastIndex = currentPage * dogsPerPage; 
    const firstIndex = lastIndex - dogsPerPage;
    const currentDogs = dogs.slice(firstIndex, lastIndex);    
    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    };
    
    useEffect(() => {
      dispatch(fetchDogs());
      dispatch(fetchTemperaments());
    }, [dispatch])
    
    return (
    <div className={styles.home}>
        <NavBar setCurrentPage={setCurrentPage}/>        
        <div className={styles.dogsContainer}>
            {
                currentDogs.forEach(dog => {
                    if(!dog.temperaments[0]) dog.temperaments[0] = "No-temperaments"
                })
            }
            {
                currentDogs.map(dog => {
                    return <Dog 
                    id={dog.id}
                    image={dog.image}
                    name={dog.name}
                    temperaments={dog.temperaments[0].name ? dog.temperaments.map(d => d.name) : dog.temperaments}
                    weight={dog.weight}
                    key={dog.id}
                    />
                })
            }

        </div>
        <div className={styles.pagination}>
            <Pagination 
                className={styles.Pagination}
                dogs={dogs.length}
                dogsPerPage={dogsPerPage}
                paginate={paginate} 
            />
        </div>
        <div className={styles.footer}>
            <Footer/>
        </div>
    </div>)
}