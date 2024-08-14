import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { ICartProduct } from "../../_interfaces/CartProduct";
import { OrderProduct } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

interface Product extends ICartProduct {
  name: string;
  image: string;
  description: string;
  productTotalPriceWithDiscounts: number;
}

export async function POST(request: Request) {
  const userSession = await getServerSession(authOptions);
  const req = await request.json();

  const {
    orderNumber,
    products,
    totalPrice,
    subtotalPrice,
    deliveryFee,
    discountValue,
    paymentMethod,
    addressFirstName,
    addressLastName,
    addressLabel,
    addressStreet,
    addressNumber,
    addressNeighborhood,
    addressCity,
    addressState,
    addressCountry,
    addressPostalCode,
    addressTelephoneDDD,
    addressTelephoneNumber,
    addressReference,
    addressComplement,
  } = req;

  const line_items = products.map((product: Product) => ({
    price_data: {
      currency: "brl",
      unit_amount: product.productTotalPriceWithDiscounts * 100,
      product_data: {
        name: product.name.toString(),
        description: product.description.toString(),
        images: [product.image],
      },
    },
    quantity: product.quantity.toString(),
  }));

  const session = await stripe.checkout.sessions.create({
    success_url: "/success/{CHECKOUT_SESSION_ID}",
    metadata: {
      orderNumber,
      products: JSON.stringify(
        products.map((product: OrderProduct) => ({
          productId: product.productId,
          basePrice: product.basePrice,
          discountPercentage: product.discountPercentage,
          quantity: product.quantity,
        })),
      ),
      totalPrice: totalPrice.toString(),
      subtotalPrice: subtotalPrice.toString(),
      userId: (userSession?.user as any)?.id,
      deliveryFee: deliveryFee.toString(),
      discountValue: discountValue.toString(),
      paymentMethod,
      addressFirstName,
      addressLastName,
      addressLabel,
      addressStreet,
      addressNumber,
      addressNeighborhood,
      addressCity,
      addressState,
      addressCountry,
      addressPostalCode,
      addressTelephoneDDD,
      addressTelephoneNumber,
      addressReference,
      addressComplement,
    },
    line_items,
    mode: "payment",
  });

  return new NextResponse(JSON.stringify({ sessionId: session.id }), {
    status: 200,
  });
}
