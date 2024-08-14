"use client";

import { CartContext } from "@/app/(shop)/_context/cart";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { PaymentMethod } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import { useContext } from "react";

interface PaymentMethodsProps {
  closePaymentModal: () => void;
}

const PaymentMethods = ({ closePaymentModal }: PaymentMethodsProps) => {
  const { paymentMethod, setPaymentMethod } = useContext(CartContext);

  const handlePaymentMethod = (paymentMethod: PaymentMethod) => {
    setPaymentMethod(paymentMethod);
    closePaymentModal();
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-[400px] items-center justify-center rounded-sm bg-white pb-5 pt-1 shadow">
        <Tabs
          defaultValue="payment_app"
          className="flex max-h-fit min-h-[280px] w-full flex-col"
        >
          <TabsList className="flex h-fit w-full flex-col items-center gap-5 bg-background">
            <div className="flex w-full items-center p-1">
              <Button
                className="rounded-full bg-white text-foreground hover:text-white"
                size="icon"
                onClick={() => closePaymentModal()}
              >
                <ChevronLeft size={20} />
              </Button>

              <h2 className="w-full text-center font-semibold uppercase text-black">
                Pagamento
              </h2>
            </div>

            <div className="flex w-full">
              <TabsTrigger
                value="payment_app"
                className="w-full py-2 uppercase"
              >
                Pagamento via Pix
              </TabsTrigger>
              <TabsTrigger
                value="payment_on_delivery"
                className="w-full py-2 uppercase"
              >
                Pagamento com Cartão
              </TabsTrigger>
            </div>
          </TabsList>

          <TabsContent value="payment_app" className="px-1">
            <div className="pb-3">
              <Separator />
            </div>

            <div
              data-method={paymentMethod === "PIX"}
              className="flex cursor-pointer items-center gap-2 rounded border p-2 data-[method=true]:border-primary"
              onClick={() => handlePaymentMethod(PaymentMethod.PIX)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#37c6d0"
                  d="M19.262,44.037l-8.04-8.04L11,35l-1.777-1.003l-5.26-5.26c-2.617-2.617-2.617-6.859,0-9.475	l5.26-5.26L11,13l0.223-0.997l8.04-8.04c2.617-2.617,6.859-2.617,9.475,0l8.04,8.04L37,13l1.777,1.003l5.26,5.26	c2.617,2.617,2.617,6.859,0,9.475l-5.26,5.26L37,35l-0.223,0.997l-8.04,8.04C26.121,46.653,21.879,46.653,19.262,44.037z"
                ></path>
                <path
                  d="M35.79,11.01c-1.76,0.07-3.4,0.79-4.63,2.04l-6.81,6.77c-0.09,0.1-0.22,0.15-0.35,0.15	s-0.25-0.05-0.35-0.15l-6.8-6.76c-1.24-1.26-2.88-1.98-4.64-2.05L8.22,15h3.68c0.8,0,1.55,0.31,2.12,0.88l6.8,6.78	c0.85,0.84,1.98,1.31,3.18,1.31s2.33-0.47,3.18-1.31l6.79-6.78C34.55,15.31,35.3,15,36.1,15h3.68L35.79,11.01z M36.1,33	c-0.8,0-1.55-0.31-2.12-0.88l-6.8-6.78c-0.85-0.84-1.98-1.31-3.18-1.31s-2.33,0.47-3.18,1.31l-6.79,6.78	C13.45,32.69,12.7,33,11.9,33H8.22l3.99,3.99c1.76-0.07,3.4-0.79,4.63-2.04l6.81-6.77c0.09-0.1,0.22-0.15,0.35-0.15	s0.25,0.05,0.35,0.15l6.8,6.76c1.24,1.26,2.88,1.98,4.64,2.05L39.78,33H36.1z"
                  opacity=".05"
                ></path>
                <path
                  d="M36.28,11.5H36.1c-1.74,0-3.38,0.68-4.59,1.91l-6.8,6.77c-0.19,0.19-0.45,0.29-0.71,0.29	s-0.52-0.1-0.71-0.29l-6.79-6.77c-1.22-1.23-2.86-1.91-4.6-1.91h-0.18l-3,3h3.18c0.93,0,1.81,0.36,2.48,1.02l6.8,6.78	c0.75,0.76,1.75,1.17,2.82,1.17s2.07-0.41,2.82-1.17l6.8-6.77c0.67-0.67,1.55-1.03,2.48-1.03h3.18L36.28,11.5z M36.1,33.5	c-0.93,0-1.81-0.36-2.48-1.02l-6.8-6.78c-0.75-0.76-1.75-1.17-2.82-1.17s-2.07,0.41-2.82,1.17l-6.8,6.77	c-0.67,0.67-1.55,1.03-2.48,1.03H8.72l3,3h0.18c1.74,0,3.38-0.68,4.59-1.91l6.8-6.77c0.19-0.19,0.45-0.29,0.71-0.29	s0.52,0.1,0.71,0.29l6.79,6.77c1.22,1.23,2.86,1.91,4.6,1.91h0.18l3-3H36.1z"
                  opacity=".07"
                ></path>
                <path
                  fill="#fff"
                  d="M38.78,14H36.1c-1.07,0-2.07,0.42-2.83,1.17l-6.8,6.78c-0.68,0.68-1.58,1.02-2.47,1.02	s-1.79-0.34-2.47-1.02l-6.8-6.78C13.97,14.42,12.97,14,11.9,14H9.22l2-2h0.68c1.6,0,3.11,0.62,4.24,1.76l6.8,6.77	c0.59,0.59,1.53,0.59,2.12,0l6.8-6.77C32.99,12.62,34.5,12,36.1,12h0.68L38.78,14z M36.1,34c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78	c-1.36-1.36-3.58-1.36-4.94,0l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l2,2h0.68c1.6,0,3.11-0.62,4.24-1.76l6.8-6.77	c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36h0.68l2-2H36.1z"
                ></path>
              </svg>

              <span>Pix</span>
            </div>
          </TabsContent>

          <TabsContent value="payment_on_delivery">
            <div className="pb-3">
              <Separator />
            </div>

            <div className="flex flex-col gap-3 px-1">
              <div
                data-method={paymentMethod === "CREDIT_CARD"}
                className="flex cursor-pointer items-center gap-2 rounded border p-2 data-[method=true]:border-primary"
                onClick={() => handlePaymentMethod(PaymentMethod.CREDIT_CARD)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25px"
                  viewBox="0 -960 960 960"
                  width="25px"
                  fill="#5f6368"
                >
                  <path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z" />
                </svg>

                <span>Cartão de Crédito</span>
              </div>

              <div
                data-method={paymentMethod === "DEBIT_CARD"}
                className="flex cursor-pointer items-center gap-2 rounded border p-2 data-[method=true]:border-primary"
                onClick={() => handlePaymentMethod(PaymentMethod.DEBIT_CARD)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25px"
                  viewBox="0 -960 960 960"
                  width="25px"
                  fill="#5f6368"
                >
                  <path d="M160-640h640v-80H160v80Zm-80-80q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v240H160v240h164v80H160q-33 0-56.5-23.5T80-240v-480ZM598-80 428-250l56-56 114 112 226-226 56 58L598-80ZM160-720v480-180 113-413Z" />
                </svg>

                <span>Cartão de Débito</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentMethods;
