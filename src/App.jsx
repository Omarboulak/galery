import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Galery from './components/Galery';
import Likes from './components/Likes';
import '../src/scss/styles.scss'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Galery />} />
          <Route path="/galery" element={<Galery />} />
          <Route path="/likes" element={<Likes />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;