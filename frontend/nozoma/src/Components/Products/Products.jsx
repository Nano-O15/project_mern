import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteProducts from "./DeleteProducts";
import { jwtDecode } from "jwt-decode";
import { IoMdSearch } from "react-icons/io";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productType, setProductType] = useState('');
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const navigate = useNavigate();

  const categories = ['Console', 'Jeux-Vidéo', 'Électronique', 'Véhicule', 'Immobilier'];

  const priceRanges = {
    min: [
      { value: '', label: 'Prix min' },
      { value: '0', label: '0 €' },
      { value: '50', label: '50 €' },
      { value: '100', label: '100 €' },
      { value: '200', label: '200 €' },
      { value: '500', label: '500 €' },
      { value: '1000', label: '1 000 €' },
      { value: '2000', label: '2 000 €' },
      { value: '5000', label: '5 000 €' },
    ],
    max: [
      { value: '', label: 'Prix max' },
      { value: '50', label: '50 €' },
      { value: '100', label: '100 €' },
      { value: '200', label: '200 €' },
      { value: '500', label: '500 €' },
      { value: '1000', label: '1 000 €' },
      { value: '2000', label: '2 000 €' },
      { value: '5000', label: '5 000 €' },
      { value: '10000', label: '10 000 €' },
    ]
  };

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm');
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
      localStorage.removeItem('searchTerm');
    }

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
    fetchProducts();
  }, [productType, searchTerm]);

  const handleSearch = () => {
    fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      const params = { productType };

      if (priceRange.min !== '') {
        params.minPrice = parseFloat(priceRange.min);
      }
      if (priceRange.max !== '') {
        params.maxPrice = parseFloat(priceRange.max);
      }

      const response = await axios.get("http://localhost:8000/products", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        params
      });

      let filteredProducts = response.data;

      if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (priceRange.min !== '' || priceRange.max !== '') {
        filteredProducts = filteredProducts.filter(product => {
          const price = parseFloat(product.price);
          const min = priceRange.min !== '' ? parseFloat(priceRange.min) : -Infinity;
          const max = priceRange.max !== '' ? parseFloat(priceRange.max) : Infinity;
          return price >= min && price <= max;
        });
      }

      setProducts(filteredProducts);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  };

  const navigateToProduct = () => navigate("/product");
  const handleProductDetails = (product) => navigate(`/product/${product._id}`);
  const handleProductUpdate = (product) => navigate(`/product_update/${product._id}`);
  const handleDelete = (productId) => setProducts(products.filter((product) => product._id !== productId));

  const handlePriceChange = (type, value) => {
    setPriceRange(prev => {
      const newRange = { ...prev, [type]: value };
      if (type === 'min' && newRange.max !== '' && parseFloat(value) > parseFloat(newRange.max)) {
        return { ...newRange, max: '' };
      }
      if (type === 'max' && newRange.min !== '' && parseFloat(value) < parseFloat(newRange.min)) {
        return { ...newRange, min: '' };
      }
      return newRange;
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="products-container">
      <h1>Liste des Annonces</h1>

      <div className="filters-container">
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Rechercher une annonce..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="filters">
            <select
              onChange={(e) => setProductType(e.target.value)}
              value={productType}
              className="category-filter"
            >
              <option value="">Toutes les Catégories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <div className="price-filter">
              <select
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="price-select"
              >
                {priceRanges.min.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              <span>à</span>
              <select
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="price-select"
              >
                {priceRanges.max.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="search-button" onClick={handleSearch}>
            <IoMdSearch size={20} />
            Rechercher
          </button>
        </div>
      </div>

      <ul className="products-list">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product._id} className="product-item">
              <div className="product-content">
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p className="product-category">{product.productType}</p>
                  <p className="product-price">{product.price} €</p>
                  <div className="product-actions">
                    <button onClick={() => handleProductDetails(product)}>Voir l'Annonce</button>
                    {product.author && userId === product.author._id && (
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

