import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteProducts from "./DeleteProducts";
import {jwtDecode} from "jwt-decode"; // Corrige l'importation de jwtDecode
import "./Products.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [productType, setProductType] = useState('');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const categories = ['Console', 'Jeux-Vidéo', 'Électronique', 'Véhicule', 'Immobilier'];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.id);
            } catch (error) {
                console.error("Erreur lors de la lecture du token :", error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/products", {
                    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
                    params: { productType },
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des annonces :", error);
            }
        };
        fetchProducts();
    }, [productType]);

    const navigateToProduct = () => navigate("/product");
    const handleProductDetails = (product) => navigate(`/product/${product._id}`);
    const handleProductUpdate = (product) => navigate(`/product_update/${product._id}`);
    const handleDelete = (productId) => setProducts(products.filter((product) => product._id !== productId));

    return (
        <div className="products-container">
            <h1>Liste des Annonces</h1>
            <select onChange={(e) => setProductType(e.target.value)} value={productType}>
                <option value="">Toutes les Catégories</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            <ul className="products-list">
            {products.length > 0 ? (
    products.map((product) => (
        <li key={product._id}>
            <p>{product.title}</p>
            <p>{product.price} €</p>
            <p>{product.productType}</p>
            {product.author && userId === product.author._id && (
                <>
                    <button onClick={() => handleProductDetails(product)}>Voir l'Annonce</button>
                    <button onClick={() => handleProductUpdate(product)}>Modifier</button>
                    <DeleteProducts productId={product._id} onDelete={handleDelete} />
                </>
            )}
        </li>
    ))
) : (
    <p className="no-products-message">Aucun produit trouvé dans cette catégorie.</p>
)}

            </ul>
            <div className="action-buttons">
                <button onClick={navigateToProduct}>Ajouter une Annonce</button>
                <button onClick={() => navigate('/users')}>Voir les Utilisateurs</button>
            </div>
        </div>
    );
};

export default Products;
