import { useContext } from "react";
import { CartContext } from "../_context/cart";
import { ICartContextType } from "../_interfaces/CartContextType";

export const useCartContext = (): ICartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext not found");
  }

  return context;
};
