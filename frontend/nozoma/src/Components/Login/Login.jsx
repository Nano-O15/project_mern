import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";

const Login = () => {
  const [email, setEmail] = useState(""); // État pour l'email
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    axios
      .post("http://localhost:8000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        alert("Connexion réussie");
        localStorage.setItem("token", response.data.token);
        navigate("/products");
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
        alert("Erreur lors de la connexion");
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion</h2>

        {/* Champ Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email} // Utilisation de l'état email
            onChange={(e) => setEmail(e.target.value)} // Gestionnaire de changement
            placeholder="Votre email"
          />
        </div>

        {/* Champ Mot de passe */}
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password} // Utilisation de l'état password
            onChange={(e) => setPassword(e.target.value)} // Gestionnaire de changement
            placeholder="Votre mot de passe"
          />
        </div>

        {/* Bouton de Connexion */}
        <button type="submit" className="btn-login">
          Se connecter
        </button>

        {/* Pied de formulaire */}
        <div className="form-footer">
          <p>
            Vous n'avez pas de compte ? <a href="/inscription">Inscrivez-vous</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
