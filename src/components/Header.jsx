import React from "react"
import { Link } from 'react-router-dom';
import Search from "./Search";
import '../scss/header.scss';

function Header() {

    return (
        <header>
            <div className='menu'>
                <h1>Galery</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/galery">Galery</Link>
                        </li>
                        <li>
                            <Link to="/likes">Likes</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="search">
                <Search />
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