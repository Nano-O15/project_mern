import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DeleteProducts from "../Products/DeleteProducts";
import { jwtDecode } from "jwt-decode";
import "../Products/Products.css";

const UserProducts = () => {
    const { userId } = useParams();
    const [products, setProducts] = useState([]);
    const [productType, setProductType] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [user, setUser] = useState(null); 
    const navigate = useNavigate();

    const categories = ['Console', 'Jeux-Vidéo', 'Électronique', 'Véhicule', 'Immobilier'];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken.id);
            } catch (error) {
                console.error("Erreur lors de la lecture du token :", error);
            }
        } else {
            console.error("Token non trouvé !");
        }
    }, []);

    useEffect(() => {
        const fetchProductsByAuthor = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user_products/${userId}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                setProducts(response.data);
                setFilteredProducts(response.data); 
            } catch (error) {
                console.error("Erreur lors de la récupération des annonces :", error);
            }
        };
        fetchProductsByAuthor();
    }, [userId]);

    useEffect(() => {
        const filterProducts = () => {
            let filtered = [...products];

            if (productType) {
                filtered = filtered.filter(product => product.productType === productType);
            }

            if (priceRange) {
                const [min, max] = priceRange.split('-').map(Number);
                if (max) {
                    filtered = filtered.filter(product => product.price >= min && product.price <= max);
                } else {
                    filtered = filtered.filter(product => product.price > 500);
                }
            }

            setFilteredProducts(filtered);
        };

        filterProducts();
    }, [productType, priceRange, products]); 

    const navigateToProduct = () => {
        navigate("/product");
    };

    const handleProductDetails = (product) => {
        navigate(`/product/${product._id}`);
    };

    const handleProductUpdate = (product) => {
        navigate(`/product_update/${product._id}`);
    };

    const handleDelete = (productId) => {
        setFilteredProducts(filteredProducts.filter((product) => product._id !== productId));
    };

    return (
        <div className="products-container">
            <h1>Liste des Annonces de l'Auteur</h1>
    
            <div className="filters">
                <select onChange={(e) => setProductType(e.target.value)} value={productType}>
                    <option value="">Toutes les Catégories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setPriceRange(e.target.value)} value={priceRange}>
                    <option value="">Plage de Prix</option>
                    <option value="0-50">0 - 50 €</option>
                    <option value="51-100">51 - 100 €</option>
                    <option value="101-200">101 - 200 €</option>
                    <option value="201-500">201 - 500 €</option>
                    <option value="500+">Plus de 500 €</option>
                </select>
            </div>
    
            <ul className="products-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <li key={product._id} className="product-item">
                            <div className="product-content">
                                <div className="product-info">
                                    <h3>{product.title}</h3>
                                    <p className="product-category">{product.productType}</p>
                                    <p className="product-price">{product.price} €</p>
                                    <div className="product-actions">
                                        <button onClick={() => handleProductDetails(product)}>Voir l'Annonce</button>
                                        {user === product.author && (
                                            <>
                                                <button onClick={() => handleProductUpdate(product)}>Modifier</button>
                                                <DeleteProducts productId={product._id} onDelete={handleDelete} />
                                            </>
                                        )}
                                    </div>
                                </div>
                                {product.imageUrl && (
                                    <div className="product-image">
                                        <img src={product.imageUrl} alt={product.title} />
                                    </div>
                                )}
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="no-products-message">Aucun produit trouvé pour cet utilisateur.</p>
                )}
            </ul>
    
            <div className="action-buttons">
                <button onClick={navigateToProduct}>Ajouter une Annonce</button>
                <button onClick={() => navigate('/users')}>Voir les Utilisateurs</button>
            </div>
        </div>
    );    
};

export default UserProducts;