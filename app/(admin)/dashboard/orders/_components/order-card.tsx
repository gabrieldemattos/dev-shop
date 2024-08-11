"use client";

import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/(shop)/_helpers/price";
import { orderStatus } from "@/app/_constants/order-status";
import { paymentIconsTranslations } from "@/app/_constants/payment-icons-translations";
import { Prisma } from "@prisma/client";
import {
  DollarSign,
  HandCoins,
  Info,
  Pencil,
  ReceiptText,
  Trash,
  Truck,
  User,
} from "lucide-react";
import Wrapper from "./wrapper";
import InfoParagraph from "./info-paragraph";
import Title from "./title";
import { useState } from "react";
import EditOrder from "./edit-order";
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
import { toast } from "sonner";
import { deleteOrderAndUpdateRating } from "../_actions/delete-order";

interface OrderCardProps {
  order: Prisma.OrderGetPayload<{
    include: {
      products: {
        include: {
          product: {
            select: {
              name: true;
            };
          };
        };
      };
    };
  }>;
  revalidateOrders: () => void;
}

const OrderCard = ({ order, revalidateOrders }: OrderCardProps) => {
  const [openEditOrder, setOpenEditOrder] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEditOrderClick = () => setOpenEditOrder(!openEditOrder);

  const handleDeleteOrderClick = async () => {
    setIsLoading(true);
    try {
      await deleteOrderAndUpdateRating(order.id);

      revalidateOrders();

      return toast.success("O pedido foi excluído!", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mb-6 max-w-full rounded-lg border border-gray-200 bg-background p-3 shadow-lg sm:max-w-2xl md:p-6 lg:max-w-4xl">
      <div className="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <h2 className="mb-4 text-lg font-bold text-gray-800 sm:mb-0 md:text-2xl">
          Detalhes do Pedido
        </h2>
        <div className="flex w-full flex-col gap-2 md:w-fit md:flex-row">
          <button
            className="flex w-full items-center justify-center gap-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition-all hover:bg-blue-700 md:w-fit"
            onClick={handleEditOrderClick}
          >
            <Pencil size={15} />
            Editar
          </button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white shadow-md transition-all hover:bg-red-700 md:w-fit">
                <Trash size={15} />
                Excluir
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja excluir esse pedido?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Você está prestes a remover o pedido número{" "}
                  {order.orderNumber}, NÃO SERÁ POSSIVEL DESFAZER esta ação.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isLoading}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={isLoading}
                  onClick={handleDeleteOrderClick}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Wrapper>
        <Title
          icon={<Info className="hidden md:block" />}
          title="Informações do Pedido"
        />

        <InfoParagraph label="Número do Pedido" content={order.orderNumber} />

        <p className="flex flex-col text-gray-600 md:block">
          <strong>Status:</strong>{" "}
          <span
            className={`${orderStatus[order.status].backgroundColor} w-fit rounded px-2 py-1 font-semibold text-background`}
          >
            {orderStatus[order.status].label}
          </span>
        </p>

        <InfoParagraph
          label="Data de Criação"
          content={new Date(order.createdAt).toLocaleDateString()}
        />

        <InfoParagraph
          label="Data de Atualização"
          content={new Date(order.updatedAt).toLocaleDateString()}
        />
      </Wrapper>

      <Wrapper>
        <Title
          icon={<ReceiptText className="hidden md:block" />}
          title="Detalhes do Produto"
        />

        {order.products.map((product) => (
          <div
            key={product.id}
            className="mb-4 space-y-1 border-b border-gray-300 pb-4"
          >
            <InfoParagraph label="Produto" content={product.product.name} />

            <InfoParagraph label="ID do Produto" content={product.productId} />

            <InfoParagraph label="Quantidade" content={product.quantity} />

            <InfoParagraph
              label="Preço Base"
              content={formatCurrency(Number(product.basePrice))}
            />

            <InfoParagraph
              label="Valor do desconto"
              content={`${product.discountPercentage}%`}
            />

            <InfoParagraph
              label="Subtotal"
              content={formatCurrency(
                Number(product.basePrice) * product.quantity,
              )}
            />

            <InfoParagraph
              label="Total"
              content={formatCurrency(
                calculateProductTotalPrice(product) * product.quantity,
              )}
            />
          </div>
        ))}
      </Wrapper>

      <Wrapper>
        <Title
          icon={<Truck className="hidden md:block" />}
          title="Informações de Entrega"
        />

        <InfoParagraph label="CEP" content={order.addressPostalCode} />

        <InfoParagraph
          label="Endereço"
          content={`${order.addressStreet}, ${order.addressNumber}`}
          className="capitalize"
        />

        <InfoParagraph
          label="Bairro"
          content={`${order.addressNeighborhood}, ${order.addressCity}, ${order.addressState}`}
          className="capitalize"
        />

        {order.addressComplement && (
          <InfoParagraph
            label="Complemento"
            content={order.addressComplement}
            className="capitalize"
          />
        )}

        {order.addressReference && (
          <InfoParagraph
            label="Referência"
            content={order.addressReference}
            className="capitalize"
          />
        )}

        <InfoParagraph
          label="Telefone"
          content={`(${order.addressTelephoneDDD}) ${order.addressTelephoneNumber}`}
        />
      </Wrapper>

      <Wrapper>
        <Title
          icon={<User className="hidden md:block" />}
          title="Informações do Cliente"
        />

        <InfoParagraph
          label="Nome"
          content={`${order.addressFirstName} ${order.addressLastName}`}
          className="capitalize"
        />
      </Wrapper>

      <Wrapper>
        <Title
          icon={<DollarSign className="hidden md:block" />}
          title="Informações Financeiras"
        />

        <InfoParagraph
          label="Taxa de Entrega"
          content={formatCurrency(Number(order.deliveryFee))}
        />

        <InfoParagraph
          label="Valor do Desconto"
          content={formatCurrency(Number(order.discountValue))}
        />
      </Wrapper>

      <Wrapper>
        <Title
          icon={<HandCoins className="hidden md:block" />}
          title="Método de Pagamento"
        />

        <div className="flex flex-col items-start gap-1 md:flex-row md:items-center">
          <p className="font-bold text-gray-600">Forma de Pagamento:</p>

          <span className="flex items-center gap-1">
            {paymentIconsTranslations[order.paymentMethod].icon}
            {paymentIconsTranslations[order.paymentMethod].translate}
          </span>
        </div>
      </Wrapper>

      <EditOrder
        orderNumber={order.orderNumber}
        currentStatus={order.status}
        openEditOrder={openEditOrder}
        setEditOrder={setOpenEditOrder}
        revalidateOrders={revalidateOrders}
      />
    </div>
  );
};

export default OrderCard;
