import { useDispatch } from "react-redux";
import { sortTemperament } from "../../redux/actions";
import { useSelector } from "react-redux";
import { ALL } from "../../utils/sort";
import styles from "./OrderByTemperaments.module.css";

export default function OrderByTemperaments () {
    let dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    function onSelectChange(e) {
        dispatch(sortTemperament(e.target.value))
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