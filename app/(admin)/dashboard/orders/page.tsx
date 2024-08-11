"use client";

import { Button } from "@/app/_components/ui/button";
import OrderList from "./_components/order-list";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { getOrderByQuery } from "./_actions/get-order-by-query";
import { Prisma } from "@prisma/client";

type Order = Prisma.OrderGetPayload<{
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

const AdminOrdersPage = () => {
  const [isLoadingNextPage, setIsLoadingNextPage] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>("");
  const [totalOrders, setTotalOrders] = useState(0);
  const pageSize = 12;

  const [orders, setOrders] = useState<Order[]>([]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const fetchOrders = async () => {
    setIsLoadingNextPage(true);

    const orders = await getOrderByQuery(query.toLocaleLowerCase());

    setOrders(orders);
    setTotalOrders(orders.length);

    setIsLoadingNextPage(false);
  };

  const handleSearchOrderClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchOrders();
  };

  return (
    <div className="grid justify-center p-8 lg:block lg:w-full">
      <div className="grid w-fit justify-center rounded-md bg-gray-200 bg-opacity-90 px-8 py-8 shadow-lg xl:w-full xl:px-32">
        <form
          onSubmit={handleSearchOrderClick}
          className="mb-6 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Busque por nome, email ou número do pedido"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary md:min-w-[600px]"
          />

          <Button type="submit">
            <Search />
          </Button>
        </form>

        <OrderList
          orders={JSON.parse(JSON.stringify(orders))}
          totalOrders={totalOrders}
          revalidateOrders={fetchOrders}
        />
      </div>

      <div className="mt-10 flex justify-between px-3">
        <Button
          className="gap-2 bg-blue-500 hover:bg-blue-600"
          onClick={handlePrevPage}
          disabled={page === 1 || isLoadingNextPage}
        >
          <ChevronLeft />
          <span className="hidden sm:block">Anterior</span>
        </Button>
        <Button
          className="gap-2 bg-blue-500 hover:bg-blue-600"
          onClick={handleNextPage}
          disabled={page * pageSize >= totalOrders || isLoadingNextPage}
        >
          <span className="hidden sm:block">Próxima</span> <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
