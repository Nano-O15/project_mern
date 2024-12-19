const mongoose = require("mongoose");
const User = require("./userModel");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    }
});

module.exports = mongoose.model("Product", productSchema);