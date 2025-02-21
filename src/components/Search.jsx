import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imgGalery } from "../redux/GalerySlice";
import '../scss/header.scss';


function Search() {
    const dispatch = useDispatch();
    const { images } = useSelector((state) => state.galery);  
    const [search, setSearch] = useState('');


    useEffect(() => {
        if(search !== ''){
            dispatch(imgGalery(search));
        }
    }, [search, dispatch]);  

    return (

        <div className="search-cont">
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}/>
            <button type="submit"><img src="" alt="" /></button>
        </div>
    );
}

export default Search;
