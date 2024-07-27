// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Virtual Stylist</h1>
      <nav>
        <ul>
          <li><Link to="/wardrobe">Wardrobe Management</Link></li>
          <li><Link to="/body-shape">Body Shape Analysis</Link></li>
          <li><Link to="/outfit-suggestions">Outfit Suggestions</Link></li>
          <li><Link to="/shopping-assistant">Shopping Assistant</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
