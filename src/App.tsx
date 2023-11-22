import React from 'react';
import { Routes, Route } from "react-router-dom";
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import EndPage from './pages/EndPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/game' element={<GamePage />} />
        <Route path='/end' element={<EndPage />} />
      </Routes>
    </div>
  );
}

export default App;
