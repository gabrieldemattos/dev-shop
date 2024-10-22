import { CheckIcon, MapPin, MapPinned, Plus } from "lucide-react";
import Header from "../_components/header";
import AddressDetails from "./_components/address-details";
import { Button } from "@/app/_components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "../../_lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "../../_lib/prisma";
import AddressOptions from "./_components/address-options";
import Title from "../_components/title";

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

      <div className="xl:px-20 2xl:px-64">
        <div className="flex flex-col justify-between gap-5 p-8 sm:flex-row">
          <Title
            icon={<MapPin />}
            title="Meus Endereços"
            className="text-sm sm:text-xl"
          />

          {addresses.length > 0 && (
            <Button className="w-fit gap-2 uppercase" asChild>
              <Link href="/my-addresses/new">
                <Plus size={16} />
                Novo Endereço
              </Link>
            </Button>
          )}
        </div>

        {addresses.length > 0 ? (
          <div className="flex flex-col gap-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-8">
            {addresses.map((address) => (
              <div
                className="relative flex w-full flex-col items-center justify-center gap-4 capitalize"
                key={address.id}
              >
                <div
                  data-active={address.active}
                  className="flex w-full items-center gap-2 rounded-sm bg-white p-5 shadow-md data-[active=true]:border-2 data-[active=true]:border-red-500 lg:min-h-full"
                >
                  <MapPinned size={35} className="text-gray-500" />

                  <AddressDetails address={address} />

                  <div className="absolute right-5 top-5 flex items-center gap-2">
                    {address.active && (
                      <div className="rounded-full bg-primary p-1">
                        <CheckIcon size={10} className="text-white" />
                      </div>
                    )}

                    <AddressOptions address={address} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-20 flex flex-col items-center justify-center gap-6 text-center">
            <MapPin className="h-16 w-16" />

            <h2 className="text-2xl font-semibold">
              Nenhum endereço cadastrado ainda
            </h2>

            <p className="text-md text-gray-600">
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
