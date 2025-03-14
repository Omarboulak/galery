import React, { useState } from "react";
import '../scss/header.scss';
import searchIcon from '../assets/search.svg'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Search({ setGalerySearch, setLikesSearch }) { 
    const [search, setSearch] = useState('');
    const location = useLocation()

    const updateSearch = () => {
        if (location.pathname === "/likes") {
          setLikesSearch(search);
        } else {
          setGalerySearch(search);
        }
        setSearch("");
      };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleClickEnter = (e) => {
        if (e.key === 'Enter') {
            updateSearch();
        }
    }
    const handleClick = () => {
        updateSearch();
    }

    useEffect(() =>{
        setSearch('')
    },[location])
    

    return (
        <div className="search-cont">
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleChange}
                onKeyDown={handleClickEnter}
            />
            <button type="submit" onClick={handleClick}><img src={searchIcon} alt="icino de una lupa" /></button>
        </div>
    );
}

export default Search;