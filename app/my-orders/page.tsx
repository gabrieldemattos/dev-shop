import Header from "../_components/header";
import { ScrollText, ShoppingCart } from "lucide-react";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { Separator } from "../_components/ui/separator";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../_components/ui/accordion";
import { orderStatus } from "../_constants/order-status";
import Link from "next/link";
import { Button } from "../_components/ui/button";
import { redirect } from "next/navigation";

const MyOrderPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/login");

  const getOrders = await db.order.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      products: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Header />

      <div className="p-8">
        <div className="mb-8">
          <div className="flex w-fit items-center gap-2 rounded-full bg-background px-3 py-[5px] uppercase shadow-md">
            <ScrollText />
            <h2 className="font-bold">Meus Pedidos</h2>
          </div>
        </div>

        {getOrders.length > 0 ? (
          <div className="space-y-5">
            {getOrders.map((order) => (
              <Accordion type="single" collapsible key={order.id}>
                <AccordionItem
                  value="item-1"
                  className="border-none bg-background shadow-md"
                >
                  <AccordionTrigger className="p-5">
                    <p
                      className={`rounded-full ${orderStatus[order.status].backgroundColor} px-3 py-[2px] text-lg text-white`}
                    >
                      {orderStatus[order.status].label} -{" "}
                      {order.createdAt.toLocaleDateString("pt-BR")}
                    </p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-5 p-5">
                      <Separator />

                      <div className="flex flex-col text-sm font-bold">
                        <h3 className="uppercase">Pagamento</h3>
                        <span className="capitalize text-primary">Pix</span>
                      </div>

                      <Separator />

                      <div className="flex flex-col space-y-2 text-sm">
                        <h3 className="font-bold uppercase">
                          Informações de entrega
                        </h3>

                        <div className="w-[350px] space-y-2">
                          <p className="truncate text-ellipsis">
                            Quem receberá:{" "}
                            <span className="font-semibold italic">
                              Fulano de tal
                            </span>
                          </p>

                          <p>
                            Endereço:{" "}
                            <span className="font-semibold capitalize italic">
                              Rua tal, 123
                            </span>
                          </p>

                          <p>
                            Bairro:{" "}
                            <span className="font-semibold capitalize italic">
                              Jardim tal - Cidade tal - sp
                            </span>
                          </p>

                          <p>
                            Complemento:{" "}
                            <span className="font-semibold capitalize italic">
                              Apto tal - Bloco tal
                            </span>
                          </p>

                          <p>
                            Referência:{" "}
                            <span className="font-semibold capitalize italic">
                              Próximo ao supermercado tal
                            </span>
                          </p>

                          <p>
                            Telefone para contato:{" "}
                            <span className="font-semibold capitalize italic">
                              (11) 99999-9999
                            </span>
                          </p>
                        </div>
                      </div>

                      <Separator />

                      {order.products.map((product) => (
                        <div className="flex space-x-4" key={product.id}>
                          <Link
                            href={`/product/${product.product.category.slug}/${product.product.slug}`}
                            className="relative aspect-square min-h-[80px] w-[80px] rounded-md border"
                          >
                            <Image
                              src={product.product.imageUrls[0]}
                              alt={product.product.name}
                              fill
                              sizes="100%"
                              className="object-contain"
                              quality={100}
                            />
                          </Link>

                          <div className="flex w-full flex-col justify-between">
                            <div className="rounded-md bg-muted py-[2px] text-center">
                              <p className="text-xs">
                                Vendido e entregue por:{" "}
                                <span className="font-bold">DEVShop</span>
                              </p>
                            </div>

                            <p className="w-[250px] truncate text-ellipsis text-xs">
                              {order.products[0].product.name}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-bold">
                                  {formatCurrency(
                                    calculateProductTotalPrice(product),
                                  )}
                                </p>

                                {product.discountPercentage > 0 && (
                                  <p className="text-xs text-muted-foreground line-through">
                                    {formatCurrency(Number(product.basePrice))}
                                  </p>
                                )}
                              </div>

                              <p className="text-xs text-muted-foreground">
                                Qtd: {product.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="space-y-[10px]">
                        <Separator />

                        <div className="flex justify-between text-sm">
                          <p>Subtotal</p>

                          <p>{formatCurrency(Number(order.subtotalPrice))}</p>
                        </div>

                        <Separator />

                        <div className="flex justify-between text-sm">
                          <p>Entrega</p>

                          <p className="uppercase">
                            {Number(order.deliveryFee) > 0
                              ? formatCurrency(Number(order.deliveryFee))
                              : "Grátis"}
                          </p>
                        </div>

                        <Separator />

                        <div className="flex justify-between text-sm">
                          <p>Descontos</p>

                          <p>- {formatCurrency(Number(order.discountValue))}</p>
                        </div>

                        <Separator />

                        <div className="flex justify-between font-bold">
                          <p className="font-bold">Total</p>

                          <p>{formatCurrency(Number(order.totalPrice))}</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-6 pt-10">
            <ShoppingCart className="h-16 w-16" />

            <h2 className="text-2xl font-semibold">
              Você ainda não fez nenhum pedido.
            </h2>
            <p className="text-md text-gray-600">
              Parece que você ainda não realizou nenhuma compra.
            </p>
            <Button asChild>
              <Link href="/" className="uppercase">
                Explore novos produtos
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrderPage;
