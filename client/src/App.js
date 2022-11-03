import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import SingleProduct from "./pages/SingleProduct";
import MessageWithButton from "./components/error/MessageWithButton";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/cart/Cart"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route
          path="*"
          element={
            <MessageWithButton
              message={`Oops! , it's a dead end`}
              buttonText={`Back to home`}
              linkTo={"/"}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/viewcart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
