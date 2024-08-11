import { formatCurrency } from "@/app/(shop)/_helpers/price";
import { DollarSign, Percent, Receipt, User, Users } from "lucide-react";
import dynamic from "next/dynamic";
import { getRecentUserCount } from "../_actions/get-recent-user-count";
import { getTodayOrdersCount } from "../_actions/get-today-orders-count";
import { getRecentOrderCount } from "../_actions/get-recent-order-count";
import { getTotalSalesIn30Days } from "../_actions/get-total-sales-in-30-day";
import { getSalesForEachCategory } from "../_actions/get-sales-for-each-category";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Separator } from "@/app/_components/ui/separator";
import InfoCard from "./_components/info-card";
import { getNewUsersLast24Hours } from "../_actions/get-new-users-last-24-hours";

const ChartBar = dynamic(() => import("./_components/chart-bar"), {
  ssr: false,
});

const ChartDonut = dynamic(() => import("./_components/chart-donut"), {
  ssr: false,
});

const AdminPage = async () => {
  const countRecentUsers = await getRecentUserCount(30);

  const countTodayOrders = await getTodayOrdersCount();

  const countOrderPast = await getRecentOrderCount(30);

  const totalSalesIn30Days = await getTotalSalesIn30Days();

  const getRecentUsers = await getNewUsersLast24Hours();

  const sales = await getSalesForEachCategory();

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 p-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
      <InfoCard
        title="Total de vendas concluídas"
        icon={<DollarSign size={20} />}
        subtitle="Total vendas em 30 dias"
        value={formatCurrency(Number(totalSalesIn30Days))}
      />

      <InfoCard
        title="Novos clientes"
        icon={<Users size={20} />}
        subtitle="Novos clientes em 30 dias"
        value={countRecentUsers}
        className="xl:-order-1"
      />

      <InfoCard
        title="Pedidos concluídos hoje"
        icon={<Percent size={20} />}
        subtitle="Total de pedidos hoje"
        value={countTodayOrders}
      />

      <InfoCard
        title="Total pedidos concluídos"
        icon={<Receipt size={20} />}
        subtitle="Total pedidos 30 dias"
        value={countOrderPast}
      />

      <div className="border-xl w-full border bg-background p-5 shadow-md md:col-span-2 lg:col-span-4 lg:h-[215px] lg:overflow-y-auto xl:-order-1 xl:col-span-2 xl:row-span-2 xl:h-[410px]">
        <div className="mb-6 space-y-2">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold">Últimos usuários</p>
            <User size={20} />
          </div>

          <p>Novos usuários nas últimas 24 horas</p>
        </div>

        {getRecentUsers.map((user) => (
          <div key={user.id}>
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={user.image as string | undefined} />
                <AvatarFallback>
                  {user?.name?.split(" ")[0][0]}
                  {user?.name?.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col text-sm">
                <p className="font-bold">{user.name}</p>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="py-3">
              <Separator />
            </div>
          </div>
        ))}
      </div>

      <div className="border-xl border bg-background p-5 shadow-md sm:col-span-2">
        <div className="flex flex-col space-y-3">
          <div className="flex w-auto items-center justify-between">
            <p className="text-xs font-semibold md:text-lg">
              Vendas concluídas por categorias (últimos 30 dias)
            </p>

            <DollarSign className="h-4 w-4" />
          </div>

          <ChartDonut sales={sales} />
        </div>
      </div>

      <div className="border-xl border bg-background p-5 shadow-md sm:col-span-2">
        <div className="flex flex-col space-y-3">
          <div className="flex w-auto items-center justify-between">
            <p className="text-xs font-semibold md:text-lg">
              Overview de vendas concluídas (últimos 6 meses)
            </p>
            <DollarSign className="h-4 w-4" />
          </div>

          <ChartBar />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
