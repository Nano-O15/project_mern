import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [author, setAuthor] = useState(null);
  const [user, setUser] = useState(null); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${productId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setProduct(response.data);
        setUser(response.data.author);
      } catch (err) {
        setError("Erreur lors de la récupération du produit.");
        console.error(err);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchAuthor = async () => {
      if(user === null) {
        return;
      }
      console.log(user);
      try {
        const response = await axios.get(`http://localhost:8080/user/${user._id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setAuthor(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération de l'utilisateur.");
        console.error(err);
      }
    };
    fetchAuthor();
  }, [user]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Chargement des informations du produit...</p>;
  }

  return (
    <>
      {author && (
        <div>
          <h1>Détails du produit</h1>
          <h2>{product.title}</h2>
          <p><strong>Description :</strong> {product.description}</p>
          <p><strong>Prix :</strong> {product.price}</p>
          <p><strong>Catégorie :</strong> {product.productType}</p>
          <p><strong>Condition :</strong> {product.condition}</p>
          <p><strong>Auteur :</strong> {author.name}</p>
          <p><strong>Date de création :</strong> {new Date(product.createdAt).toLocaleString()}</p>
          <button onClick={() => navigate("/products")}>Retour à la liste des produits</button>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
