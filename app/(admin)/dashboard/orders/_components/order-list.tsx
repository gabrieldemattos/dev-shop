import { Prisma } from "@prisma/client";
import OrderCard from "./order-card";

interface OrderCardProps {
  orders: Prisma.OrderGetPayload<{
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
  }>[];
  totalOrders: number;
  revalidateOrders: () => void;
}

const OrderList = ({
  orders,
  totalOrders,
  revalidateOrders,
}: OrderCardProps) => {
  return (
    <>
      <p className="py-3 text-xs font-bold md:text-lg">
        {totalOrders === 1
          ? "1 pedido encontrado"
          : `${totalOrders} pedidos encontrados`}{" "}
        desse usuário
      </p>
      <div className="w-full">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={JSON.parse(JSON.stringify(order))}
            revalidateOrders={revalidateOrders}
          />
        ))}
      </div>
    </>
  );
};

export default OrderList;
