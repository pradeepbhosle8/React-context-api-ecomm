import { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext();
// console.log(AuthContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hooks

const useCart = () => useContext(CartContext);
export { useCart, CartProvider };