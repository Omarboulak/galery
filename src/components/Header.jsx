import React from "react";
import { Link } from 'react-router-dom';
import Search from "./Search";
import '../scss/header.scss';

function Header({ handleSearch }) { 
    return (
        <header>
            <div className='menu'>
                <h1><Link to="/galery"> Gallery Images</Link></h1>
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
                <Search handleSearch={handleSearch} /> ç
            </div>
        </header>
    );
}

export default Header;