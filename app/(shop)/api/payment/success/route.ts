import { createOrder } from "@/app/(shop)/_actions/order";
import { OrderProduct } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

type ProductsMetaData = {
  productId: string;
  basePrice: number;
  discountPercentage: number;
  quantity: number;
};

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature")!;

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET_KEY!,
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const products = JSON.parse(session.metadata.products);

    await createOrder({
      orderNumber: session.metadata.orderNumber,
      user: {
        connect: {
          id: session.metadata.userId,
        },
      },
      products: {
        createMany: {
          data: products.map((product: OrderProduct) => ({
            productId: product.productId,
            basePrice: Number(product.basePrice),
            discountPercentage: Number(product.discountPercentage),
            quantity: Number(product.quantity),
          })),
        },
      },
      totalPrice: Number(session.metadata.totalPrice),
      subtotalPrice: Number(session.metadata.subtotalPrice),
      deliveryFee: 0,
      discountValue: Number(session.metadata.discountValue),
      paymentMethod: session.metadata.paymentMethod,
      addressFirstName: session.metadata.addressFirstName,
      addressLastName: session.metadata.addressLastName,
      addressLabel: session.metadata.addressLabel,
      addressStreet: session.metadata.addressStreet,
      addressNumber: session.metadata.addressNumber,
      addressNeighborhood: session.metadata.addressNeighborhood,
      addressCity: session.metadata.addressCity,
      addressState: session.metadata.addressState,
      addressCountry: session.metadata.addressCountry,
      addressPostalCode: session.metadata.addressPostalCode,
      addressTelephoneDDD: session.metadata.addressTelephoneDDD,
      addressTelephoneNumber: session.metadata.addressTelephoneNumber,
      addressReference: session.metadata.addressReference ?? undefined,
      addressComplement: session.metadata.addressComplement ?? undefined,
    });
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
