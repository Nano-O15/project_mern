import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DeleteProducts from "../Products/DeleteProducts";
import { jwtDecode } from "jwt-decode";

const UserProducts = () => {
    const { userId } = useParams();
    const [products, setProducts] = useState([]);
    const [productType, setProductType] = useState('');
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
                const response = await axios.get(`http://localhost:8080/user_products/${userId}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des annonces :", error);
            }
        };
        fetchProductsByAuthor();
    }, [userId]);

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
        setProducts(products.filter((product) => product._id !== productId));
    };

    return (
        <div>
            <h1>Liste des Annonces de l'Auteur</h1>

            <select onChange={(e) => setProductType(e.target.value)} value={productType}>
                <option value="">Toutes les Catégories</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <ul>
                {products.length > 0 ? (
                    products.map((product) => (
                        <li key={product._id}>
                            <p>{product.title}</p>
                            <p>{product.price} €</p>
                            <p>{product.productType}</p>
                            <button onClick={() => handleProductDetails(product)}>Voir l'Annonce</button>
                            {user === product.author && (
                                <>
                                    <button onClick={() => handleProductUpdate(product)}>Modifier</button>
                                    <DeleteProducts productId={product._id} onDelete={handleDelete} />
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <p>Aucun produit trouvé pour cet utilisateur.</p>
                )}
            </ul>

            <button onClick={navigateToProduct}>Ajouter une Annonce</button>
            <button onClick={() => navigate('/users')}>Voir les Utilisateurs</button>
        </div>
    );
};

export default UserProducts;
