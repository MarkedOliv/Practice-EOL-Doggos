import { useDispatch } from "react-redux";
import { ASCENDENTE, DESCENDENTE } from "../../utils/sort";
import { sortName } from "../../redux/actions";
import styles from "./OrderByName.module.css"

export default function OrderByName () {
    let dispatch = useDispatch();
    function onSelectChange(e) {
        dispatch(sortName(e.target.value))
    }
    return (
    <div>
        <span className={styles.alpha}>alphabetical</span>
        <select name="select" 
        className={styles.selectName} onChange={onSelectChange}>
            <option disabled value="Order by name: ">Order by name: </option>
            <option value={ASCENDENTE}>A - Z</option>
            <option value={DESCENDENTE}>Z - A</option>
        </select>
    </div>
    )
}