import React from "react"
import { Link } from 'react-router-dom';
import Search from "./Search";
import '../scss/header.scss';
import Select from "./Select";

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
            </div>
        </header>
    )
}

export default Header;