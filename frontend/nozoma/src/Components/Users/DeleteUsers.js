import axios from "axios";
import React from "react";

const DeleteUsers = ({ userId, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      axios
        .delete(`http://localhost:8080/user/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          console.log("Utilisateur supprimé !");
          onDelete(userId); 
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l'utilisateur :", error);
        });
    }
  };
  return <button onClick={handleDelete}>Supprimer</button>;
};

export default DeleteUsers;
