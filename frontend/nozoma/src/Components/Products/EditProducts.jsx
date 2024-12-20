import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [imageUrl, setImageUrl] = useState("");
 
  const categories = ['Console', 'Jeux-Vidéo', 'Électronique', 'Véhicule', 'Immobilier'];
  const conditions = ['Neuf', 'Très bon état', 'Bon état', 'État moyen', 'À rénover'];
 
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
          setImageUrl(product.imageUrl || "");
        } else {
          console.error("Annonce non trouvée !");
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des annonces :", error);
      });
  }, [productId]);
 
  const validateImageUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
 
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url && !validateImageUrl(url)) {
      e.target.setCustomValidity("Veuillez entrer une URL valide");
    } else {
      e.target.setCustomValidity("");
    }
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8000/product/${productId}`,
        { title, description, price, condition, productType, imageUrl },
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
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
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
              required
              min="0"
              step="0.01"
            />
          </label>
        </div>
        <div>
          <label>
            État:
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            >
              <option value="">Sélectionnez l'état</option>
              {conditions.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Catégorie:
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Image (URL):
            <input
              type="url"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="URL de l'image du produit"
            />
          </label>
          {imageUrl && validateImageUrl(imageUrl) && (
            <div className="image-preview">
              <img src={imageUrl} alt="Aperçu du produit" />
            </div>
          )}
        </div>
        <button type="submit">Mettre à Jour</button>
      </form>
    </div>
  );
};
 
export default EditProducts;