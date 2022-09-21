import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchDogs, fetchDogs } from '../../redux/actions';
import styles from './SearchBar.module.css';

export default function SearchBar () {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchDogs());
  }, [dispatch]);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
    dispatch(searchDogs(search));
    history.push("/dogs/page/1");
  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input type="text" onChange={handleOnChange} value={search} className={styles.SearchBar} placeholder="Search..."/>
      </form>
    </>
  )
}
