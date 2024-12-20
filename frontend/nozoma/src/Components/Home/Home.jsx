import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products');
      } catch (error) {
        console.error(error);
      }
    };
    fetchAnnonce();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenue sur MauvaisCoins</h1>

     
      
    </div>
  );
};

export default Home;
