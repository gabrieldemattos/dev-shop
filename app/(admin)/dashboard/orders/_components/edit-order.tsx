"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { orderStatus } from "@/app/_constants/order-status";
import { OrderStatus } from "@prisma/client";
import { FormEvent, useState } from "react";
import { updateOrder } from "../_actions/update-order";
import { toast } from "sonner";

interface EditOrderProps {
  orderNumber: string;
  currentStatus: OrderStatus;
  openEditOrder: boolean;
  setEditOrder: (open: boolean) => void;
  revalidateOrders: () => void;
}

const EditOrder = ({
  orderNumber,
  currentStatus,
  openEditOrder,
  setEditOrder,
  revalidateOrders,
}: EditOrderProps) => {
  const [updateOrderStatus, setUpdateOrderStatus] = useState<
    string | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const allOrderStatus = Object.values(OrderStatus);

  const handleUpdateOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    if (currentStatus === updateOrderStatus) return setEditOrder(false);

    if (!updateOrderStatus) {
      return setError("Escolha um status acima para continuar");
    }

    try {
      await updateOrder(orderNumber, updateOrderStatus as OrderStatus);

      setEditOrder(false);

      revalidateOrders();

      return toast.success("Status do pedido alterado com sucesso!", {
        position: "bottom-center",
      });
    } catch (error) {
      if (error instanceof Error) {
        setError("Ocorreu um erro, tente novamente");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={openEditOrder} onOpenChange={setEditOrder}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Pedido Número {orderNumber}
          </DialogTitle>

          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdateOrder} className="space-y-10">
          <div className="space-y-1">
            <label
              data-error={error}
              className="text-nowrap text-sm font-semibold data-[error]:text-destructive sm:text-base"
            >
              Alterar status do pedido:
            </label>

            <Select
              value={updateOrderStatus}
              onValueChange={setUpdateOrderStatus}
            >
              <SelectTrigger
                data-error={error}
                className="w-full shadow-md focus:ring-0 data-[error]:border-destructive"
              >
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                {allOrderStatus.map((status) => (
                  <SelectItem value={status} key={status}>
                    {orderStatus[status].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {error && <span className="text-xs text-destructive">{error}</span>}
          </div>

          <Button
            className="w-full uppercase"
            disabled={isLoading || !updateOrderStatus}
          >
            Atualizar Pedido
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrder;
