import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { IoMdContact, IoMdAddCircle, IoMdSearch, IoMdLogOut } from "react-icons/io";
import { FaHeart, FaRegBell } from "react-icons/fa";

const Navbar = () => {
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const storedAuthor = localStorage.getItem('author');
    const storedRole = localStorage.getItem('role');
    
    console.log('Author:', storedAuthor);
    console.log('Role:', storedRole);
    
    if(storedRole) {
      setRole(storedRole);
    }
    
    if (storedAuthor) {
      setAuthor(storedAuthor);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('author');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthor('');
    setRole('');
    window.location.href = '/connexion';
  };

  const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <a href="/" className="navbar-logo">
              <img
                src="https://i.postimg.cc/76HR3tMQ/mauvaiscoin.webp"
                alt="Logo LeMauvaiscoin"
              />
            </a>
            <a href='/product' className='post-ad-link'>
            <button className="post-ad-button" type="button" >
              <IoMdAddCircle size={22} />
              <span>Déposer une annonce</span>
            </button>
            </a>
          </div>

          <div className="navbar-search">
            <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
              <IoMdSearch className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Rechercher des annonces"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          <div className="navbar-right">
            {!author ? (
              <div className="auth-buttons">
                <a href="/connexion" className="login-button">Se connecter</a>
                <a href="/inscription" className="register-button">S'inscrire</a>
                <a href='/users' className="register-button">Voir user</a>
              </div>
            ) : (
              <div className="user-menu">
                <a href="/favoris" className="icon-button">
                  <FaHeart />
                  <span>Favoris</span>
                </a>
                <a href="/notifications" className="icon-button">
                  <FaRegBell />
                  <span>Messages</span>
                </a>
                <a href="/users" className='icon-button'>All User</a>
                <button onClick={handleLogout} className="logout-button">
                  <IoMdLogOut size={22} />
                  <span>Déconnexion</span>
                </button>
                <div className="user-profile">
                  <IoMdContact size={22} />
                  <span className="user-name">{author}</span>
                  {role && <span className="role-badge">{formattedRole}</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      <div className="navbar-categories">
        <div className="categories-container">
          <ul>
            <li><a href="/categorie/immobilier">IMMOBILIER</a></li>
            <li><a href="/categorie/voitures">VOITURES</a></li>
            <li><a href="/categorie/motos">MOTOS</a></li>
            <li><a href="/categorie/multimedia">MULTIMÉDIA</a></li>
            <li><a href="/categorie/maison">MAISON</a></li>
            <li><a href="/categorie/loisirs">LOISIRS</a></li>
            <li><a href="/categorie/emploi">EMPLOI</a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;