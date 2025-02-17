import React from "react"
import { Link } from 'react-router-dom';
import '../scss/header.scss';

function Header(){

    return (
        <header>
            <div className='menu'>
                <h1>Galery</h1>
                <ul>
                    <li>
                        <a href="">Home</a>
                        <a href="">My Photos</a>
                    </li>
                </ul>
            </div>

            <div className="search">
                <input type="text" />
                <select >
                    <option value="heigt">heigt</option>
                    <option value="with">with</option>
                    <option value="likes">likes</option>
                    <option value="Date">Date</option>
                </select>
            </div>
        </header>
    )
}

export default Header;