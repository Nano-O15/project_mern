const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const Register = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res
                .status(400)
                .send("Merci de remplir les champs Name, Email & Password");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
        });

        await user.save();

        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const Login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).send("Utilisateur introuvable");
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(400).send("Mot de passe incorrect");
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).send({ message: "Connecté", token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const GetUsers = async (req, res) => {
    try {
        const filter = {};

        if (req.query.name) {
            filter.name = { $regex: req.query.name, $options: "i" };
        }

        const users = await User.find(filter).select("-password");
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const GetById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

const UpdateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
        }).select("-password");
        if (!user) {
            return res.status(404).send({ error: "Utilisateur introuvable" });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const DeleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).send({ error: "Utilisateur introuvable" });
        }
        res.status(200).send({ message: "Utilisateur supprimé" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { Register, Login, GetUsers, GetById, UpdateUser, DeleteUser };