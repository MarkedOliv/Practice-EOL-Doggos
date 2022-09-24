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
        <select name="select" onChange={onSelectChange} className={styles.selectWeight}>
            <option selected disabled>Weight: </option>
            <option value={MIN}>MIN</option>
            <option value={MAX}>MAX</option>
        </select>
    </>
    )
}