"use client";

import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useCartContext } from "../../_hooks/useCartContext";

interface SuccessPageProps {
  params: {
    sessionId: string;
  };
}

const SuccessPage = ({ params }: SuccessPageProps) => {
  const { clearCart } = useCartContext();

  useEffect(() => {
    clearCart();

    toast("Pedido concluído com sucesso!", {
      description: "Obrigado! Seu pedido foi recebido e está sendo processado.",
      position: "bottom-center",
      duration: 3000,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex h-full items-center justify-center px-5 md:px-0">
        <div className="relative w-full max-w-lg md:p-12">
          <div className="text-center">
            <Check className="mx-auto h-24 w-24 text-green-500" />

            <h1 className="mt-4 text-4xl font-extrabold text-gray-800">
              Pagamento Concluído!
            </h1>
            <p className="mb-6 mt-2 text-lg text-gray-600">
              Sua transação foi realizada com sucesso. Agradecemos pela sua
              compra!
            </p>

            <div className="flex flex-col gap-4 md:justify-center">
              <Button
                className="rounded-lg bg-green-600 px-6 py-3 text-white shadow-lg transition duration-300 ease-in-out hover:bg-green-700 focus:outline-none"
                asChild
              >
                <Link href="/">Voltar para a Página Inicial</Link>
              </Button>

              <Button className="rounded-lg bg-gray-700 px-6 py-3 text-white shadow-lg transition duration-300 ease-in-out hover:bg-gray-900 focus:outline-none">
                <Link href="/my-orders">Ir para Meus Pedidos</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
