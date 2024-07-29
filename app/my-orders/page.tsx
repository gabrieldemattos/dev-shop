import Header from "../_components/header";
import { ShoppingCart } from "lucide-react";
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
import { formatPhoneNumber } from "../_helpers/format-phone-number";
import { paymentIconsTranslations } from "../_constants/payment-icons-translations";
import AddressInfoParagraph from "./_components/address-info-paragraph";
import BuyAgainButton from "./_components/buy-again-button";
import ReviewButton from "./_components/review-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_components/ui/carousel";
import Title from "../_components/title";

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
          reviews: true,
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

      <div className="p-8 lg:mb-16 lg:pt-0 2xl:px-64">
        <div className="mb-8">
          <Title icon={<ShoppingCart />} title="Meus pedidos" />
        </div>

        {getOrders.length > 0 ? (
          <div className="space-y-5 lg:space-y-0">
            {getOrders.map((order) => (
              <Accordion
                type="single"
                collapsible
                key={order.id}
                className="lg:hidden"
              >
                <AccordionItem
                  value="item-1"
                  className="border-none bg-background shadow-md"
                >
                  <AccordionTrigger className="p-5">
                    <p
                      className={`rounded-lg ${orderStatus[order.status].backgroundColor} px-3 py-[2px] text-white`}
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
                        <span className="capitalize text-primary">
                          {
                            paymentIconsTranslations[order.paymentMethod]
                              .translate
                          }
                        </span>
                      </div>

                      <Separator />

                      <div className="flex flex-col space-y-2 text-sm">
                        <h3 className="font-bold uppercase">
                          Informações de entrega
                        </h3>

                        <div className="w-[350px] space-y-2">
                          <AddressInfoParagraph
                            addressInfo="Nome do endereço"
                            label={order.addressLabel}
                          />

                          <AddressInfoParagraph
                            addressInfo="Quem receberá"
                            label={
                              order.addressFirstName +
                              " " +
                              order.addressLastName
                            }
                          />

                          <AddressInfoParagraph
                            addressInfo="Endereço"
                            label={
                              order.addressStreet + ", " + order.addressNumber
                            }
                          />

                          <p>
                            Bairro:{" "}
                            <span className="font-semibold capitalize italic">
                              {order.addressNeighborhood} - {order.addressCity}{" "}
                              -{" "}
                              <span className="uppercase">
                                {order.addressState}
                              </span>
                            </span>
                          </p>

                          {order.addressComplement && (
                            <AddressInfoParagraph
                              addressInfo="Complemento"
                              label={order.addressComplement}
                            />
                          )}

                          {order.addressComplement && (
                            <AddressInfoParagraph
                              addressInfo="Referência"
                              label={order.addressReference ?? ""}
                              className="w-72 truncate xl:w-96"
                            />
                          )}

                          <AddressInfoParagraph
                            addressInfo="Telefone para contato"
                            label={formatPhoneNumber(
                              order.addressTelephoneDDD,
                              order.addressTelephoneNumber,
                            )}
                          />
                        </div>
                      </div>

                      <Separator />

                      {order.products.map((product, index) => (
                        <div key={product.id} className="space-y-3">
                          <div className="flex space-x-4">
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
                                {product.product.name}
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
                                      {formatCurrency(
                                        Number(product.basePrice),
                                      )}
                                    </p>
                                  )}
                                </div>

                                <p className="text-xs text-muted-foreground">
                                  Qtd: {product.quantity}
                                </p>
                              </div>
                            </div>
                          </div>

                          {order.status === "DELIVERED" && (
                            <>
                              <div className="flex items-center justify-between px-3">
                                <ReviewButton
                                  orderProductId={order.products[0].id}
                                  product={JSON.parse(
                                    JSON.stringify(product.product),
                                  )}
                                />

                                <BuyAgainButton
                                  product={JSON.parse(
                                    JSON.stringify(product.product),
                                  )}
                                  quantity={product.quantity}
                                />
                              </div>

                              <div className="px-3 py-1">
                                <Separator />
                              </div>
                            </>
                          )}
                        </div>
                      ))}

                      <div className="space-y-[10px]">
                        {order.status !== "DELIVERED" && <Separator />}

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

            <div className="hidden space-y-4 lg:block">
              {getOrders.map((order, index) => (
                <div
                  className="flex w-fit gap-4 rounded border bg-background px-16 py-4 shadow-lg"
                  key={index}
                >
                  <div className="flex flex-col lg:w-[400px] xl:w-[500px]">
                    <Carousel className="max-w-auto w-full flex-1">
                      <CarouselContent>
                        {order.products.map((product, index) => (
                          <CarouselItem
                            key={index}
                            className="flex w-auto flex-col items-center justify-center"
                          >
                            <Link
                              href={`/product/${product.product.category.slug}/${product.product.slug}`}
                              className="relative flex aspect-square min-h-[130px] w-[80px] items-center justify-center"
                            >
                              <Image
                                src={product.product.imageUrls[0]}
                                alt={product.product.name}
                                fill
                                sizes="100%"
                                className="object-contain"
                              />
                            </Link>

                            <div className="rounded-md bg-muted p-[4px] text-center">
                              <p className="text-[.6875rem]">
                                Vendido e entregue por:{" "}
                                <span className="font-bold">DEVShop</span>
                              </p>
                            </div>

                            <div className="mt-3 flex w-full flex-col justify-between space-y-2">
                              <p className="text-sm">{product.product.name}</p>

                              <div className="flex flex-col space-y-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-base font-bold">
                                    {formatCurrency(
                                      calculateProductTotalPrice(product),
                                    )}
                                  </p>

                                  {product.discountPercentage > 0 && (
                                    <p className="text-sm text-muted-foreground line-through">
                                      {formatCurrency(
                                        Number(product.basePrice),
                                      )}
                                    </p>
                                  )}
                                </div>

                                <p className="text-sm text-muted-foreground">
                                  Qtd: {product.quantity}
                                </p>
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>

                    <div className="space-y-[10px]">
                      <div className="pt-2">
                        <Separator />
                      </div>

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

                  <div className="ml-12 h-auto">
                    <Separator orientation="vertical" />
                  </div>

                  <div className="ml-4 flex flex-col space-y-4">
                    <div>
                      <p
                        className={`rounded-lg ${orderStatus[order.status].backgroundColor} px-3 py-[2px] text-white`}
                      >
                        {orderStatus[order.status].label} -{" "}
                        {order.createdAt.toLocaleDateString("pt-BR")}
                      </p>
                    </div>

                    <Separator />

                    <div className="flex flex-col space-y-1 text-sm font-bold">
                      <p className="text-lg uppercase">Pagamento</p>

                      <span className="flex items-center gap-2 text-base capitalize text-primary">
                        {paymentIconsTranslations[order.paymentMethod].icon}
                        {
                          paymentIconsTranslations[order.paymentMethod]
                            .translate
                        }
                      </span>
                    </div>

                    <Separator />

                    <div className="flex flex-col space-y-2 text-sm">
                      <h3 className="font-bold uppercase">
                        Informações de entrega
                      </h3>

                      <div className="w-[350px] space-y-4">
                        <AddressInfoParagraph
                          addressInfo="Nome do endereço"
                          label={order.addressLabel}
                        />

                        <AddressInfoParagraph
                          addressInfo="Quem receberá"
                          label={
                            order.addressFirstName + " " + order.addressLastName
                          }
                        />

                        <AddressInfoParagraph
                          addressInfo="Endereço"
                          label={
                            order.addressStreet + ", " + order.addressNumber
                          }
                        />

                        <p>
                          Bairro:{" "}
                          <span className="font-semibold capitalize italic">
                            {order.addressNeighborhood} - {order.addressCity} -{" "}
                            <span className="uppercase">
                              {order.addressState}
                            </span>
                          </span>
                        </p>

                        {order.addressComplement && (
                          <AddressInfoParagraph
                            addressInfo="Complemento"
                            label={order.addressComplement}
                          />
                        )}

                        {order.addressComplement && (
                          <AddressInfoParagraph
                            addressInfo="Referência"
                            label={order.addressReference ?? ""}
                            className="w-72 truncate xl:w-96"
                          />
                        )}

                        <AddressInfoParagraph
                          addressInfo="Telefone para contato"
                          label={formatPhoneNumber(
                            order.addressTelephoneDDD,
                            order.addressTelephoneNumber,
                          )}
                        />
                      </div>
                    </div>

                    {order.status === "DELIVERED" && (
                      <>
                        <Separator />

                        {order.products.map((product) => (
                          <div key={product.id}>
                            <div className="flex items-center justify-between">
                              <ReviewButton
                                orderProductId={order.products[0].id}
                                product={JSON.parse(
                                  JSON.stringify(product.product),
                                )}
                              />

                              <BuyAgainButton
                                product={JSON.parse(
                                  JSON.stringify(product.product),
                                )}
                                quantity={product.quantity}
                              />
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-20 flex h-full flex-col items-center justify-center gap-6">
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
