// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import WardrobeManagement from './components/WardrobeManagement';
import BodyShapeAnalysis from './components/BodyShapeAnalysis';
import OutfitSuggestions from './components/OutfitSuggestions';
import ShoppingAssistant from './components/ShoppingAssistant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wardrobe" element={<WardrobeManagement />} />
        <Route path="/body-shape" element={<BodyShapeAnalysis />} />
        <Route path="/outfit-suggestions" element={<OutfitSuggestions />} />
        <Route path="/shopping-assistant" element={<ShoppingAssistant />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
