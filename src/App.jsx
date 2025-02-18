import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Galery from './components/Galery';



function App() {

  return (
    <>
      <Header />
      <main>
        <Galery />  
      </main>
    </>
  )
}

export default App
