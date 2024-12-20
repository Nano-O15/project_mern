import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProducts.css";

const AddProducts = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [condition, setCondition] = useState("");
    const [productType, setProductType] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    // Liste des catégories prédéfinies
    const categories = ['Console', 'Jeux-Vidéo', 'Électronique', 'Véhicule', 'Immobilier'];
    
    // Liste des conditions prédéfinies
    const conditions = ['Neuf', 'Très bon état', 'Bon état', 'État moyen', 'À rénover'];

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:8000/product",
                { 
                    title, 
                    description, 
                    price, 
                    condition, 
                    productType,
                    imageUrl 
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then(() => navigate("/products"))
            .catch((error) => {
                console.error("Erreur lors de l'ajout du produit:", error);
                alert("Erreur lors de l'ajout du produit");
            });
    };

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

    return (
        <div className="add-product-container">
            <h1>Ajouter une Annonce</h1>
            <form className="add-product-form" onSubmit={handleSubmit}>
                <div>
                    <label>
                        Titre:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Titre de l'annonce"
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
                            placeholder="Description détaillée du produit"
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
                            placeholder="Prix en euros"
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
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddProducts;
