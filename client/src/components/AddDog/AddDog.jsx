import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTemperaments, createDog } from "../../redux/actions";
import img from '../../assets/Doge.jpg';
import styles from "./AddDog.module.css";

function validate(dog) {
    let errors = {}
    if(!dog.name) {
        errors.name = "Name is required";
    }
    if(!dog.name.length > 0 && dog.name.length < 4) {
        errors.name = "Name should have more than 4 letters"
    }
    if(dog.name.length !== 0){
        if(!/^[a-z A-Z,.'-]+$/.test(dog.name)) {
            errors.name = "Introduce a valid name";
        }
    }
    if(!dog.min_height || !dog.max_height) {
        errors.min_height = "Height is required";
        errors.max_height = "Height is required";
    }
    if(Number(dog.min_height) <= 0) {
        errors.min_height = "Min-Height cannot be less than or equal 0"
    }
    if(Number(dog.max_height) <= 0) {
        errors.max_height = "Max-Height cannot be less than or equal 0"
    }
    if(Number(dog.max_height) > 0 && Number(dog.min_height) > 0 && Number(dog.min_height) === Number(dog.max_height)) {
        errors.min_height = "Min-Height cannot be equal to Max-Height";
        errors.min_height = "Max-Height cannot be equal to Min-Height";
    }
    if(Number(dog.min_height) > Number(dog.max_height)) {
        errors.min_height = "Min-Height cannot be greater than Max-Height"
        errors.max_height = "Max-Height cannot be less than Min-Height"
    }
    if(!dog.min_weight || !dog.max_weight) {
        errors.min_weight = "Weight is required";
        errors.max_weight = "Weight is required";
    }
    if(Number(dog.min_weight) <= 0) {
        errors.min_weight = "Min-Weight cannot be less than or equal 0"
    }
    if(Number(dog.max_weight) <= 0) {
        errors.max_weight = "Max-Weight cannot be less than or equal 0"
    }
    if(Number(dog.max_weight) > 0 && Number(dog.min_weight) > 0 && Number(dog.min_weight) === Number(dog.max_weight)) {
        errors.min_weight = "Min-Weight cannot be equal to Max-Weight";
        errors.min_weight = "Max-Weight cannot be equal to Min-Weight";
    }
    if(Number(dog.min_weight) > Number(dog.max_weight)) {
        errors.min_weight = "Min-Weight cannot be greater than Max-Weight"
        errors.max_weight = "Max-Weight cannot be less than Min-Weight"
    }
    if(!dog.life_span) {
        errors.life_span = "Life_Span is required"
    }
    else if(!dog.life_span.includes("years")) {
        errors.life_span = "Life-Span format should be like: 10 - 14 years"
    }
    if(!dog.image || !dog.image.includes("http") || dog.image.length < 6){
        errors.image = "Image shoud be an url";
    }
    return errors
}

export default function AddDog () {

    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
    });
    const [dog, setDog] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperaments: [],
    })
    
    useEffect(() => {
        dispatch(fetchTemperaments());
    }, [dispatch]);

    useEffect(()=>{
        if (
            dog.name.length > 4 &&
            /^[a-z A-Z,.'-]+$/.test(dog.name) &&
            dog.min_height.length > 0 &&
            Number(dog.min_height) > 0 && 
            Number(dog.min_height) < Number(dog.max_height) && 
            dog.max_height.length > 0 &&
            Number(dog.max_height) > 0 && 
            Number(dog.max_height) > Number(dog.min_height) && 
            dog.min_weight.length > 0 &&
            Number(dog.min_weight) > 0 && 
            Number(dog.min_weight) < Number(dog.max_weight) && 
            dog.max_weight.length > 0 &&
            Number(dog.max_weight) > 0 && 
            Number(dog.max_weight) > Number(dog.min_weight) && 
            dog.life_span.length > 6 &&
            dog.life_span.includes("years")
            ) setButton(false);
        else setButton(true);
    }, [dog, setButton]);

    const onSubmit = (e) => {
        e.preventDefault();
        if(!dog.image || !dog.image.includes("http") || dog.image.length < 6) {
            dog.image = img;
        }
        dispatch(createDog(dog));
        alert("Dog created :D")
        setDog({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperaments: [],
        });
    }
    
    const handleChange = (e) => {
        setDog({
            ...dog,
            [e.target.name]:e.target.value
        });
        setErrors(validate({
            ...dog,
            [e.target.name]:e.target.value
        }));
    }

    const handleSelect = (e) => {
        if(!dog.temperaments.includes(e.target.value)) {
            setDog({
                ...dog,
                temperaments: [...dog.temperaments,  e.target.value],
            });
        }
    }
    
    const handleDelete = (temp) => {
        setDog({
            ...dog,
            temperaments: dog.temperaments.filter(t => t !== temp)
        });
    }
    return <div className={styles.container}>
        <Link to="/dogs" className={styles.goBackBtn}>Go back</Link>
        <form id="form" onSubmit={onSubmit} className={styles.formContainer}>
            <label className={styles.labelInput}>Name: </label>
            {
                !errors.name ?null :<p className={styles.errorsP}>{errors.name}</p>
            }
            <input className={styles.controlsInputT} type="text" name="name" value={dog.name.trim()} onChange={(e) => handleChange(e)} />
            <label className={styles.labelInput}>Min-Height: </label>
            {
                !errors.min_height ?null :<p className={styles.errorsP}>{errors.min_height}</p>
            }
            <input className={styles.controlsInputT} type="number" name="min_height" value={dog.min_height} onChange={(e) => handleChange(e)}/>
            <label className={styles.labelInput}>Max-Height: </label>
            {
                !errors.max_height ?null :<p className={styles.errorsP}>{errors.max_height}</p>
            }
            <input className={styles.controlsInputT} type="number" name="max_height" value={dog.max_height} onChange={(e) => handleChange(e)}/>
            <label className={styles.labelInput}>Min-Weight: </label>
            {
                !errors.min_weight ?null :<p className={styles.errorsP}>{errors.min_weight}</p>
            }
            <input className={styles.controlsInputT} type="number" name="min_weight" value={dog.min_weight} onChange={(e) => handleChange(e)}/>
            <label className={styles.labelInput}>Max-Weight: </label>
            {
                !errors.max_weight ?null :<p className={styles.errorsP}>{errors.max_weight}</p>
            }
            <input className={styles.controlsInputT} type="number" name="max_weight" value={dog.max_weight} onChange={(e) => handleChange(e)}/>
            <label className={styles.labelInput}>Life-Span: </label>
            {
                !errors.life_span ?null :<p className={styles.errorsP}>{errors.life_span}</p>
            }
            <input className={styles.controlsInputT} type="text" name="life_span" value={dog.life_span} onChange={(e) => handleChange(e)}/>
            <label className={styles.labelInput}>Image: </label>
            {
                !errors.image ?null :<p className={styles.errorsP}>{errors.image}</p>
            }
            <input className={styles.controlsInputT} type="url" name="image" value={dog.image} onChange={(e) => handleChange(e)}/>

            <span className={styles.labelInput}>Temperaments: </span>
            <select className={styles.toSelectT} name="temperaments" id="temperaments" onChange={(e) => handleSelect(e)}>
                <option selected>{"-->"}</option>
                {
                    temperaments?.map(t => {
                        return <option value={t.name} key={t.name+Math.random()}>{t.name}</option>
                    })
                }
            </select>
            <ul className={styles.tempSelected}>
            {
                dog?.temperaments.map(t => 
                        <li className={styles.tempSelectedEl} key={t} onClick={() => handleDelete(t)}>{t}</li>)
            }
            </ul>
            <button className={styles.submitBtn}disabled={button} type="submit" form="form">Create Dog</button>
        </form>
        
    </div>
}