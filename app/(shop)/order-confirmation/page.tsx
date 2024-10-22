"use client";

import { useRouter } from "next/navigation";
import BackButton from "../_components/back-button";
import Header from "../_components/header";
import { useCartContext } from "../_hooks/useCartContext";
import { toast } from "sonner";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Separator } from "@/app/_components/ui/separator";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserActiveAddress } from "../_actions/get-user-active-address";
import { Address, PaymentMethod } from "@prisma/client";
import { Dot, Loader2, ShoppingCart, Trash } from "lucide-react";
import Link from "next/link";
import { formatPhoneNumber } from "../_helpers/format-phone-number";
import { createOrder, generateOrderNumber } from "../_actions/order";
import PaymentMethods from "./_components/payment_method";
import { paymentIconsTranslations } from "../../_constants/payment-icons-translations";
import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { getInactiveProductInOrder } from "./_actions/get-inactive-products-in-order";
import { loadStripe } from "@stripe/stripe-js";

const OrderConfirmationPage = () => {
  const { data } = useSession();

  const [isConfirmationOrder, setIsConfirmationOrder] =
    useState<boolean>(false);
  const [isAddressLoading, setIsAddressLoading] = useState<boolean>(false);
  const [userActiveAddress, setUserActiveAddress] = useState<
    Address | undefined
  >(undefined);
  const [isOpenPaymentModal, setIsOpenPaymentModal] = useState<boolean>(false);
  const [inactiveProducts, setInactiveProducts] = useState<string[]>([]);

  const router = useRouter();

  const {
    products,
    deleteProductFromCart,
    clearCart,
    totalPriceWithDiscounts,
    totalPriceWithoutDiscounts,
    totalDiscounts,
    paymentMethod,
  } = useCartContext();

  useEffect(() => {
    if (!data) return;

    const fetchUserActiveAddress = async () => {
      try {
        setIsAddressLoading(true);
        const fetchActiveAddress = await getUserActiveAddress(data?.user.id);
        const activeAddress = fetchActiveAddress?.addresses[0];

        setUserActiveAddress(activeAddress);
      } catch (error) {
        console.log(error);
      } finally {
        setIsAddressLoading(false);
      }
    };

    if (data?.user.id) fetchUserActiveAddress();
  }, [data]);

  const handleClearCartClick = () => {
    router.push(`/`);

    toast.success("Sua sacola foi limpa!", {
      position: "bottom-center",
      duration: 2000,
    });

    clearCart();
  };

  useEffect(() => {
    if (products.length === 0) return;
    const checkIfProductIsActive = async () => {
      const productsId = products.map((product) => product.id);

      const isInactive = await Promise.all(
        productsId.map((id) => getInactiveProductInOrder(id)),
      );

      setInactiveProducts(
        isInactive
          .filter((product) => product !== null && product !== undefined)
          .map((item) => item!.id as string),
      );
    };

    checkIfProductIsActive();
  }, [products]);

  const handleFinishOrderClick = async () => {
    if (!data?.user) return router.push("/login");

    if (products.length === 0) return;

    if (inactiveProducts.length > 0) {
      return toast.error("Um ou mais produtos estão fora de estoque.", {
        position: "bottom-center",
        duration: 2000,
      });
    }

    if (!userActiveAddress) {
      return toast.error("Adicione um endereço para finalizar o pedido.", {
        position: "bottom-center",
        duration: 2000,
      });
    }

    if (!paymentMethod) {
      return toast.error("Selecione uma forma de pagamento.", {
        position: "bottom-center",
        duration: 2000,
      });
    }

    try {
      setIsConfirmationOrder(true);

      const orderNumber = await generateOrderNumber();

      if (paymentMethod === "PIX") {
        await createOrder({
          orderNumber,
          user: {
            connect: {
              id: data.user.id,
            },
          },
          products: {
            createMany: {
              data: products.map((product) => ({
                productId: product.id,
                basePrice: product.basePrice,
                discountPercentage: product.discountPercentage,
                quantity: product.quantity,
              })),
            },
          },
          totalPrice: totalPriceWithDiscounts,
          subtotalPrice: totalPriceWithoutDiscounts,
          deliveryFee: 0,
          discountValue: totalDiscounts,
          paymentMethod: paymentMethod as PaymentMethod,
          addressFirstName: userActiveAddress.firstName,
          addressLastName: userActiveAddress.lastName,
          addressLabel: userActiveAddress.label,
          addressStreet: userActiveAddress.street,
          addressNumber: userActiveAddress.number,
          addressNeighborhood: userActiveAddress.neighborhood,
          addressCity: userActiveAddress.city,
          addressState: userActiveAddress.state,
          addressCountry: userActiveAddress.country,
          addressPostalCode: userActiveAddress.postalCode,
          addressTelephoneDDD: userActiveAddress.telephoneDDD,
          addressTelephoneNumber: userActiveAddress.telephoneNumber,
          addressReference: userActiveAddress.reference ?? undefined,
          addressComplement: userActiveAddress.complement ?? undefined,
        });

        clearCart();

        toast("Pedido concluído com sucesso!", {
          description:
            "Obrigado! Seu pedido foi recebido e está sendo processado.",
          position: "bottom-center",
          duration: 3000,
        });

        return router.push("/my-orders");
      }

      const res = await fetch("/api/payment", {
        method: "POST",
        body: Buffer.from(
          JSON.stringify({
            orderNumber,
            products: products.map((product) => ({
              productId: product.id,
              basePrice: Number(product.basePrice).toFixed(2),
              discountPercentage: Number(product.discountPercentage).toFixed(2),
              productTotalPriceWithDiscounts: Number(
                calculateProductTotalPrice(product),
              ).toFixed(2),
              quantity: product.quantity,
              name: product.name,
              description: product.description,
              image: product.imageUrls[0],
            })),
            totalPrice: Number(totalPriceWithDiscounts).toFixed(2),
            subtotalPrice: Number(totalPriceWithoutDiscounts).toFixed(2),
            deliveryFee: 0,
            discountValue: Number(totalDiscounts).toFixed(2),
            paymentMethod: paymentMethod as PaymentMethod,
            addressFirstName: userActiveAddress.firstName,
            addressLastName: userActiveAddress.lastName,
            addressLabel: userActiveAddress.label,
            addressStreet: userActiveAddress.street,
            addressNumber: userActiveAddress.number,
            addressNeighborhood: userActiveAddress.neighborhood,
            addressCity: userActiveAddress.city,
            addressState: userActiveAddress.state,
            addressCountry: userActiveAddress.country,
            addressPostalCode: userActiveAddress.postalCode,
            addressTelephoneDDD: userActiveAddress.telephoneDDD,
            addressTelephoneNumber: userActiveAddress.telephoneNumber,
            addressReference: userActiveAddress.reference ?? undefined,
            addressComplement: userActiveAddress.complement ?? undefined,
          }),
        ),
      });

      if (!res.ok) {
        return toast.error("Ocorreu um erro ao realizar a compra!", {
          position: "bottom-center",
        });
      }

      const { sessionId } = await res.json();

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_KEY as string,
      );

      await stripe?.redirectToCheckout({
        sessionId,
      });
    } catch (error) {
      toast.error("Erro ao finalizar o pedido, tente novamente!", {
        position: "bottom-center",
      });
    } finally {
      setIsConfirmationOrder(false);
    }
  };

  const handleChosePaymentMethod = () =>
    setIsOpenPaymentModal(!isOpenPaymentModal);

  return (
    <>
      <div>
        {products.length > 0 ? (
          <div className="flex items-center justify-between p-5 lg:px-40 xl:px-60 2xl:px-96">
            <BackButton />
            <span className="uppercase">Sacola</span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="link" disabled={isConfirmationOrder}>
                  Limpar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja realmente limpar o carrinho?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Todos os itens adicionados serão removidos permanentemente.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearCartClick}>
                    Limpar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <>
            <Header />
          </>
        )}

        {products.length > 0 ? (
          <div className="space-y-10 lg:px-40 xl:px-60 2xl:px-96">
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                {products.map((product) => (
                  <div className="flex flex-col px-4" key={product.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Link
                          className="relative h-20 w-20"
                          href={`/product/${product.categorySlug}/${product.slug}`}
                        >
                          <Image
                            src={product.imageUrls[0]}
                            alt={product.name}
                            fill
                            sizes="100%"
                            className="rounded-lg bg-background object-contain"
                          />

                          <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-1 text-xs font-bold text-white">
                            {product.quantity}
                          </span>
                        </Link>

                        <div className="flex flex-col space-y-4">
                          <div
                            data-inactive-product={inactiveProducts.includes(
                              product.id,
                            )}
                            className="flex w-[150px] flex-col gap-1 font-semibold text-muted-foreground data-[inactive-product=true]:text-destructive data-[inactive-product=true]:line-through sm:w-[200px] md:w-[450px]"
                          >
                            <span className="truncate text-sm capitalize md:whitespace-normal">
                              {product.name}
                            </span>
                          </div>

                          <div>
                            <span className="text-sm font-semibold text-muted-foreground">
                              {formatCurrency(Number(product.basePrice))}
                            </span>
                          </div>
                        </div>
                      </div>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Trash className="h-5 w-5 cursor-pointer text-destructive transition hover:opacity-70" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Tem certeza que deseja remover esse produto do
                              carrinho?
                            </AlertDialogTitle>
                            <AlertDialogDescription></AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteProductFromCart(product.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Remover
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    {inactiveProducts.includes(product.id) && (
                      <span className="pl-2 text-xs font-semibold text-destructive">
                        Fora de estoque
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <Separator />
            </div>

            <div className="flex flex-col gap-2 px-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1">
                  <h2 className="font-semibold">Pagamento</h2>

                  <div className="text-xs font-bold text-red-500 md:text-base">
                    *Ao selecionar cartão: não use dados reais. Utilize o cartão
                    de teste: 4242 4242 4242 4242.*
                  </div>
                </div>

                {paymentMethod && (
                  <Button
                    variant="link"
                    className="h-fit p-0"
                    onClick={handleChosePaymentMethod}
                  >
                    Trocar
                  </Button>
                )}
              </div>

              {!paymentMethod ? (
                <div>
                  <Button
                    variant="link"
                    className="h-fit p-0"
                    onClick={handleChosePaymentMethod}
                  >
                    Selecionar forma de pagamento
                  </Button>
                </div>
              ) : (
                <div className="flex justify-between px-2">
                  <div className="flex gap-2">
                    <p>
                      {
                        paymentIconsTranslations[paymentMethod as PaymentMethod]
                          .icon
                      }
                    </p>
                    <p>
                      {
                        paymentIconsTranslations[paymentMethod as PaymentMethod]
                          .translate
                      }
                    </p>
                  </div>
                </div>
              )}

              {isOpenPaymentModal && (
                <PaymentMethods closePaymentModal={handleChosePaymentMethod} />
              )}
            </div>

            <div className="px-8">
              <div className="flex items-center justify-between">
                <h2 className="mb-2 font-bold uppercase">
                  Endereço de entrega
                </h2>

                {userActiveAddress && (
                  <Button
                    variant="link"
                    className="h-fit p-0"
                    onClick={() => router.push("/my-addresses")}
                  >
                    Trocar
                  </Button>
                )}
              </div>

              {isAddressLoading && <p>Carregando..</p>}

              {userActiveAddress && (
                <div className="flex items-center justify-between">
                  <div className="flex w-full flex-col break-words">
                    <p className="font-semibold capitalize">
                      {userActiveAddress.firstName} {userActiveAddress.lastName}
                    </p>
                    <p className="capitalize">
                      {userActiveAddress.street}, {userActiveAddress.number}
                    </p>
                    <p className="capitalize">
                      {userActiveAddress.neighborhood}- {userActiveAddress.city}{" "}
                      -{" "}
                      <span className="uppercase">
                        {userActiveAddress.state}
                      </span>
                    </p>
                    <p className="capitalize">{userActiveAddress.complement}</p>
                    <p>
                      Tel:{" "}
                      {formatPhoneNumber(
                        userActiveAddress.telephoneDDD,
                        userActiveAddress.telephoneNumber,
                      )}
                    </p>
                    {userActiveAddress.reference && (
                      <p className="mt-1 flex items-center text-xs text-muted-foreground">
                        <Dot size={15} />{" "}
                        <span className="truncate">
                          {userActiveAddress.reference}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {!isAddressLoading && !userActiveAddress && (
                <Button
                  variant="link"
                  className="h-fit p-0"
                  asChild
                  disabled={isAddressLoading}
                >
                  <Link href="/my-addresses/new">Adicionar endereço</Link>
                </Button>
              )}
            </div>

            <div className="px-8">
              <h2 className="mb-2 font-bold uppercase">Resumo de valores</h2>

              <div className="flex flex-col gap-1 px-2">
                <p className="flex justify-between text-sm text-muted-foreground">
                  Subtotal
                  <span>
                    {formatCurrency(Number(totalPriceWithoutDiscounts))}
                  </span>
                </p>
                <p className="flex justify-between text-sm text-muted-foreground">
                  Descontos
                  <span>{formatCurrency(Number(totalDiscounts))}</span>
                </p>
                <p className="flex justify-between text-sm text-muted-foreground">
                  Taxa de entrega
                  <span className="uppercase text-primary">Grátis</span>
                </p>
                <p className="flex justify-between font-semibold">
                  Total
                  <span>{formatCurrency(Number(totalPriceWithDiscounts))}</span>
                </p>
              </div>
            </div>

            <div className="px-8">
              <Button
                className="w-full"
                onClick={handleFinishOrderClick}
                disabled={
                  isConfirmationOrder ||
                  isAddressLoading ||
                  !paymentMethod ||
                  !userActiveAddress
                }
              >
                {isConfirmationOrder && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Confirmar pedido -{" "}
                {formatCurrency(Number(totalPriceWithDiscounts))}
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-20 flex flex-col items-center">
            <div className="flex items-center justify-center rounded-full bg-gray-200 p-5">
              <ShoppingCart size={29} className="fill-red-500 stroke-red-500" />
            </div>

            <p className="mt-6 text-nowrap text-2xl font-medium">
              Seu carrinho está vazio
            </p>

            <div className="py-3">
              <p className="text-center text-sm">
                São milhares de produtos para você escolher
              </p>

              <p className="text-center text-sm">
                Escolha seus produtos e adicione em seu carrinho
              </p>
            </div>

            <Button className="mt-2 uppercase" onClick={() => router.push("/")}>
              Comece a comprar agora
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderConfirmationPage;
