import axios from "axios";
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "../Login/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        
        localStorage.setItem("token", token);
        localStorage.setItem("author", decodedToken.email.split('@')[0]);
        localStorage.setItem("role", "user");
        
        console.log('LocalStorage après connexion:', {
          token: localStorage.getItem('token'),
          author: localStorage.getItem('author'),
          role: localStorage.getItem('role')
        });
        
        alert("Connexion réussie");
        window.location.href = '/products';
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

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Votre mot de passe"
          />
        </div>

        <button type="submit" className="btn-login">
          Se connecter
        </button>

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
