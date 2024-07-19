import { PaymentMethod } from "@prisma/client";
import { ICartProduct } from "./CartProduct";

export interface ICartContextType {
  products: ICartProduct[];
  totalProducts: number;
  totalPriceWithDiscounts: number;
  totalPriceWithoutDiscounts: number;
  totalDiscounts: number;
  paymentMethod: string | null;
  setPaymentMethod: (paymentMethod: PaymentMethod) => void;
  addProductToCart: ({ product }: { product: ICartProduct }) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  deleteProductFromCart: (productId: string) => void;
  clearCart: () => void;
}
