import { ICartProduct } from "./CartProduct";

export interface ICartContextType {
  products: ICartProduct[];
  totalProducts: number;
  totalPriceWithDiscounts: number;
  totalPriceWithoutDiscounts: number;
  totalDiscounts: number;
  addProductToCart: ({ product }: { product: ICartProduct }) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  deleteProductFromCart: (productId: string) => void;
}
