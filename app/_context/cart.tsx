"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { ICartProduct } from "../_interfaces/CartProduct";
import { ICartContextType } from "../_interfaces/CartContextType";
import { calculateProductTotalPrice } from "../_helpers/price";

export const CartContext = createContext<ICartContextType>({
  products: [],
  totalProducts: 0,
  totalPriceWithDiscounts: 0,
  totalPriceWithoutDiscounts: 0,
  totalDiscounts: 0,
  addProductToCart: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  deleteProductFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ICartProduct[]>([]);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const parsedCartData: ICartProduct[] = JSON.parse(cartData);
      parsedCartData.forEach((item) => {
        setProducts((prev) => [...prev, { ...item }]);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  const addProductToCart: ICartContextType["addProductToCart"] = ({
    product,
  }) => {
    const existingProduct = products.find(
      (productInCart) => productInCart.id === product.id,
    );

    if (existingProduct) {
      return setProducts((prev) =>
        prev.map((productInCart) =>
          productInCart.id === product.id
            ? {
                ...product,
                quantity: productInCart.quantity + product.quantity,
              }
            : productInCart,
        ),
      );
    }

    setProducts((prev) => [...prev, { ...product }]);
  };

  const incrementQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product,
      ),
    );
  };

  const decrementQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: product.quantity === 1 ? 1 : product.quantity - 1,
            }
          : product,
      ),
    );
  };

  const deleteProductFromCart = (productId: string) =>
    setProducts((prev) => prev.filter((product) => product.id !== productId));

  const totalProducts = products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const totalPriceWithDiscounts = products.reduce(
    (acc, product) =>
      acc + product.quantity * calculateProductTotalPrice(product),
    0,
  );

  const totalPriceWithoutDiscounts = products.reduce(
    (acc, product) => acc + product.quantity * Number(product.basePrice),
    0,
  );

  const totalDiscounts = totalPriceWithoutDiscounts - totalPriceWithDiscounts;

  return (
    <CartContext.Provider
      value={{
        products,
        totalProducts,
        totalPriceWithDiscounts,
        totalPriceWithoutDiscounts,
        totalDiscounts,
        addProductToCart,
        incrementQuantity,
        decrementQuantity,
        deleteProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
