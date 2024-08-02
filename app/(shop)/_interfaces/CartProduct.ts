import { Product } from "@prisma/client";

interface CartWithQuantity extends Product {
  quantity: number;
}

export interface ICartProduct extends CartWithQuantity {
  categorySlug: string;
}
