import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProducts = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [condition, setCondition] = useState("");
    const [productType, setProductType] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:8080/product",
                { title, description, price, condition, productType },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                navigate("/products");
            });
    };

    return (
        <div>
            <h1>Ajouter une Annonce</h1>
            <form onSubmit={handleSubmit}>
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
                            type="integer"
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
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddProducts;
