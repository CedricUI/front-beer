import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [articleNumber, setArticleNumber] = useState(0);

  return (
    <CartContext.Provider value={{ articleNumber, setArticleNumber }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;