import React, { useState } from "react";
import '../scss/header.scss';
import searchIcon from '../assets/search.svg'

function Search({ handleSearch }) { 
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleClickEnter = (e) => {
        if (e.key === 'Enter') {
            handleSearch(search);
        }
    }
    const handleClick = () => {
        handleSearch(search); 
    }

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