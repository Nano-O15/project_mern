import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Users from "./Components/Users/Users";
import EditUsers from "./Components/Users/EditUsers";
import Products from "./Components/Products/Products";
import AddProducts from "./Components/Products/AddProducts";
import EditProducts from "./Components/Products/EditProducts";
import ProductDetails from "./Components/Products/ProductDetails";
import Wrapper from "../src/Components/Wraper/Wraper";
import Home from "../src/Components/Home/Home";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/inscription" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user_update/:userId" element={<EditUsers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/product" element={<AddProducts />} />
          <Route path="/product_update/:productId" element={<EditProducts />} />
        </Routes>
        </Wrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;

