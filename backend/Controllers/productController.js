const Product = require("../Models/productModel");

const CreateProduct = async (req, res) => {
    const { title, description, price, condition, productType } = req.body;

    if (!title || !description || !price || !condition || !productType) {
        return res.status(400).send("Merci de remplir tous les champs");
    }

    const authorId = req.user.id;
    try {
        const product = new Product({
            ...req.body,
            author: authorId,
        });

        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const GetProducts = async (req, res) => {
    try {
        const filter = {};
        if (req.query.title) {
            filter.title = { $regex: req.query.title, $options: "i" };
        }

        if (req.query.productType) {
            filter.productType = req.query.productType;
        }

        const products = await Product.find(filter).populate(
            "author",
            "name email"
        );

        res.status(200).send(products);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const GetByProductId = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate(
            "author",
            "name email"
        );
        if (!product) {
            return res.status(404).send({ error: "Produit introuvable" });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const GetByAuthorId = async (req, res) => {
    try {
        const { userId } = req.params;

        const products = await Product.find({ author: userId });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'Aucun produit trouvé pour cet auteur.' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits par authorId:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

const UpdateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            {
                new: true,
            }
        );
        if (!product) {
            return res.status(404).send({ error: "Produit introuvable" });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const DeleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) {
            return res.status(404).send({ error: "Produit introuvable" });
        }
        res.status(200).send({ message: "Produit supprimée" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { CreateProduct, GetProducts, GetByProductId, GetByAuthorId, UpdateProduct, DeleteProduct };
