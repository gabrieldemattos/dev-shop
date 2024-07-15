import { CheckIcon, MapPin, MapPinned, Plus } from "lucide-react";
import Header from "../_components/header";
import AddressDetails from "./_components/address-details";
import { Button } from "../_components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "../_lib/prisma";

const MyAddressesPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/login");

  const addresses = await db.address.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: [
      {
        active: "desc",
      },
      {
        label: "asc",
      },
    ],
  });

  return (
    <>
      <Header />

      <div className="p-8">
        <div className="mb-8 flex justify-between">
          <div className="flex w-fit items-center gap-2 rounded-full bg-background px-3 py-[5px] uppercase shadow-md">
            <MapPin />
            <h2 className="font-bold">Meus Endereços</h2>
          </div>

          {addresses.length > 0 && (
            <Button className="gap-2 uppercase" asChild>
              <Link href="/my-addresses/new">
                <Plus size={16} />
                Novo Endereço
              </Link>
            </Button>
          )}
        </div>

        {addresses.length > 0 ? (
          <div className="flex flex-col gap-4">
            {addresses.map((address) => (
              <div
                className="relative flex w-full flex-col items-center justify-center gap-4 capitalize"
                key={address.id}
              >
                <div
                  data-active={address.active}
                  className="flex w-full items-center gap-2 rounded-sm bg-white p-5 shadow-md data-[active=true]:border-2 data-[active=true]:border-red-500"
                >
                  <MapPinned size={35} className="text-gray-500" />

                  <AddressDetails address={address} />

                  <div className="absolute right-5 top-5 flex items-center gap-2">
                    {address.active && (
                      <div className="rounded-full bg-primary p-1">
                        <CheckIcon size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg p-4 text-center text-sm font-semibold text-muted-foreground">
            <MapPin size={24} className="text-gray-500" />
            <p className="mt-2 text-base">Nenhum endereço cadastrado ainda</p>
            <p className="text-sm text-gray-500">
              Para facilitar suas compras, adicione um endereço de entrega.
            </p>
            <Button className="gap-2 uppercase" asChild>
              <Link href="/my-addresses/new">
                <>
                  <Plus size={18} />
                  Novo Endereço
                </>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyAddressesPage;
