import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = () => {
        axios
            .post("http://localhost:8000/register", {
                name,
                email,
                password,
            })
            .then((response) => {
                alert("Compte créé avec succès");
                navigate("/");
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={(e) => e.preventDefault()}>
                <h2>Inscription</h2>
                <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Votre nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn-register" onClick={handleRegister}>
                    S'inscrire
                </button>
                <div className="form-footer">
                    <p>
                        Vous avez déjà un compte ? <a href="/">Connectez-vous</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
    