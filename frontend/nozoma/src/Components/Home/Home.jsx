import React, { useEffect } from 'react';
import './Home.css';

const Home = () => {
  

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
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
