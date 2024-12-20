import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditProducts.css";

const EditProducts = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [productType, setProductType] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/products", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        const product = response.data.find((r) => r._id === productId);
        if (product) {
          setTitle(product.title);
          setDescription(product.description);
          setPrice(product.price);
          setCondition(product.condition);
          setProductType(product.productType);
        } else {
          console.error("Annonce non trouvée !");
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des annonces :", error);
      });
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8000/product/${productId}`,
        { title, description, price, condition, productType },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      )
      .then(() => navigate("/products"))
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'annonce :", error);
      });
  };

  return (
    <div className="edit-product-container">
      <h1>Modifier l'Annonce</h1>
      <form className="edit-product-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Titre:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Prix:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            État:
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Type de Produit:
            <input
              type="text"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Mettre à Jour</button>
      </form>
    </div>
  );
};

export default EditProducts;
