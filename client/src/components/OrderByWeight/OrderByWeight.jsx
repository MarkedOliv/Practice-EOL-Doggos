import { useDispatch } from "react-redux";
import { MIN, MAX } from "../../utils/sort";
import { sortWeight } from "../../redux/actions";
import styles from "./OrderByWeight.module.css"

export default function OrderByWeight  () {
    let dispatch = useDispatch();
    function onSelectChange(e) {
        dispatch(sortWeight(e.target.value))
    }
    return (
    <>
        <span className={styles.weight}>weight</span>
        <select name="select" onChange={onSelectChange} className={styles.selectWeight}>
            <option value="Order by weight: " disabled> Order by weight: </option>
            <option value={MIN}>MIN</option>
            <option value={MAX}>MAX</option>
        </select>
    </>
    )
}