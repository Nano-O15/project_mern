const express = require("express");
const app = express();
app.use(express.json());

const PORT = 8000;

const cors = require("cors");
app.use(cors({ origin: "*" }));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/project_mern", {});

console.log("Connected to MongoDB");

const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});