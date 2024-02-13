import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home";

import Layout from "./components/Layout/Layout";
import Product from "./components/Product/Product";
import { createContext, useState } from "react";
import Cart from "./components/Cart/Cart";

export const SearchContext = createContext();
export const CartContext = createContext();

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  return (
    <>
      <SearchContext.Provider value={{ search: search, setSearch: setSearch }}>
      <CartContext.Provider value={{ cart: cart, setCart: setCart }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="*" element={<Navigate to={{ pathname: "/home" }} />} />
          </Route>
        </Routes>
      </CartContext.Provider>
      </SearchContext.Provider>
    </>
  );
}

export default App;
