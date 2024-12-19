import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUsers = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const user = response.data.find((r) => r._id === userId);
        if (user) {
          setName(user.name);
          setEmail(user.email);
        } else {
          console.error("Utilisateur non trouvée !");
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      });
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:8080/user/${userId}`,
        { name, email },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        navigate("/users");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      });
  };

  return (
    <div>
      <h1>Modifier l'Utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Mettre à Jour</button>
      </form>
    </div>
  );
};

export default EditUsers;
