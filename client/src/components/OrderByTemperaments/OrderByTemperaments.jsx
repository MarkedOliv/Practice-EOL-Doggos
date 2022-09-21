import { useDispatch } from "react-redux";
import { sortTemperament } from "../../redux/actions";
import { useSelector } from "react-redux";
import { ALL } from "../../utils/sort";
import { useHistory } from "react-router-dom";
import styles from "./OrderByTemperaments.module.css";

export default function OrderByTemperaments ({ setCurrentPage }) {
    let dispatch = useDispatch();
    let history = useHistory();
    const temperaments = useSelector(state => state.temperaments);
    function onSelectChange(e) {
        dispatch(sortTemperament(e.target.value))
        setCurrentPage(1);
        history.push('/dogs/page/1');
    }
    return (
    <div>
        <span className={styles.temp}>temperaments</span>
        <select name="select" onChange={onSelectChange} className={styles.selectTemp}>
            <option value="Order by temperaments:" disabled>Order by temperaments:</option>
            <option value={ALL}>ALL</option>
            <option value="No-temperaments">No-temperaments</option>
            {
                temperaments?.map(t => (
                    <option value={t.name} key={t.id}>{t.name}</option>
                ))
            }
        </select>
    </div>
    )
}