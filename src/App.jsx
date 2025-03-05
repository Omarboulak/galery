import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Galery from './components/Galery';
import Likes from './pages/Likes';
import '../src/scss/styles.scss';

function App() {
    const [search, setSearch] = useState('');

    const handleSearch = (query) => {
        setSearch(query); 
    };

    return (
        <Router>
            <Header handleSearch={handleSearch} /> 
            <main>
                <Routes>
                    <Route path="/" element={<Galery search={search} />} /> 
                    <Route path="/galery" element={<Galery search={search} />} />
                    <Route path="/likes" element={<Likes />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;