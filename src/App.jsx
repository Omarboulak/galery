import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Galery from "./components/Galery";
import Likes from "./pages/Likes";
import "../src/scss/styles.scss";

function App() {
  // Estado de búsqueda para cada sección
  const [galerySearch, setGalerySearch] = useState("");
  const [likesSearch, setLikesSearch] = useState("");

  return (
    <Router>
      {/* Se le pasan dos callbacks para actualizar cada estado */}
      <Header
        setGalerySearch={setGalerySearch}
        setLikesSearch={setLikesSearch}
      />
      <main>
        <Routes>
          <Route path="/" element={<Galery search={galerySearch} />} />
          <Route path="/galery" element={<Galery search={galerySearch} />} />
          <Route path="/likes" element={<Likes search={likesSearch} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
