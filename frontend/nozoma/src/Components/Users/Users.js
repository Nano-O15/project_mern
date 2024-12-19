import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteUsers from "./DeleteUsers";
import { jwtDecode } from "jwt-decode";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token", token);
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log("decodedToken", decodedToken);
                setUserId(decodedToken.id);
                console.log("userId", decodedToken.id);
            } catch (error) {
                console.error("Erreur lors de la lecture du token :", error);
            }
        } else {
            console.error("Token non trouvé !");
        }
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8080/users", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
            });
    }, []);

    const handleUserUpdate = (user) => {
        navigate(`/user_update/${user._id}`);
    };

    const handleDelete = (userId) => {
        setUsers(users.filter((users) => users._id !== userId));
    };

    return (
        <div>
            <h1>Liste des Utilisateurs</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        {userId === user._id && (
                            <>
                                <button onClick={() => handleUserUpdate(user)}>Modifier</button>
                                <DeleteUsers userId={user._id} onDelete={handleDelete} />
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/products')}>Voir les Annonces</button>
        </div>
    );
};

export default Users;
