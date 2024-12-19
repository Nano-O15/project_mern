import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteProducts from "../Products/DeleteProducts";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productType, setProductType] = useState('');
  const navigate = useNavigate();

  const categories = ['Console', 'Jeux-Vidéo', 'Électronique', 'Véhicule', 'Immobilier'];

  useEffect(() => {
      axios
        .get("http://localhost:8080/products", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des annonces :", error);
        });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: { productType }, 
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces :", error);
      }
    };
    fetchProducts();
  }, [productType]);

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
      <h1>Liste des Annonces</h1>
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
              <p>{product.price}</p>
              <p>{product.productType}</p>
              <button onClick={() => handleProductDetails(product)}>Voir l'Annonce</button>
              <button onClick={() => handleProductUpdate(product)}>Modifier</button>
              <DeleteProducts productId={product._id} onDelete={handleDelete} />
            </li>
          ))
        ) : (
          <p>Aucun produit trouvé dans cette catégorie.</p>
        )}
      </ul>
      <button onClick={navigateToProduct}>Ajouter une Annonce</button>
      <button onClick={() => navigate('/users')}>Voir les Utilisateurs</button>
    </div>
  );
};

export default Products;
