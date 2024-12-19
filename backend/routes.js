const express = require("express");
const router = express.Router();
const { Register, Login, GetUsers, GetById, UpdateUser, DeleteUser } = require("./Controllers/userController");
const { CreateProduct, GetProducts, GetByProductId, UpdateProduct, DeleteProduct } = require("./Controllers/productController");
const authMiddleware = require("./Middleware/authMiddleware");

router.post("/register", Register);
router.post("/login", Login);
router.get("/users", authMiddleware, GetUsers);
router.get("/user/:userId", authMiddleware, GetById);
router.put("/user/:userId", authMiddleware, UpdateUser);
router.delete("/user/:userId", authMiddleware, DeleteUser);
router.post("/product", authMiddleware, CreateProduct);
router.get("/products", authMiddleware, GetProducts);
router.get("/product/:productId", authMiddleware, GetByProductId);
router.put("/product/:productId", authMiddleware, UpdateProduct);
router.delete("/product/:productId", authMiddleware, DeleteProduct);


module.exports = router;