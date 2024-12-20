import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem('token');
    // Rediriger vers la page d'accueil
    navigate('/');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Se déconnecter
    </button>
  );
};

export default LogoutButton; 