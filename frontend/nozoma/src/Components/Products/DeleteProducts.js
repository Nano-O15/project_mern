import axios from "axios";
import React from "react";

const DeleteProducts = ({ productId, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      axios
        .delete(`http://localhost:8080/product/${productId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          console.log("Produit supprimé !");
          onDelete(productId); 
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression du produit :", error);
        });
    }
  };
  return <button onClick={handleDelete}>Supprimer</button>;
};

export default DeleteProducts;
