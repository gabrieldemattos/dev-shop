import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import ProductItem from "../_components/product-item";
import { Heart } from "lucide-react";
import { redirect } from "next/navigation";

const MyFavoritesPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/login");

  const userFavorites = session
    ? await db.userFavoriteProduct.findMany({
        where: {
          userId: session?.user?.id,
        },
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      })
    : [];

  return (
    <>
      <Header />

      <div className="p-8">
        <div className="mb-8">
          <div className="flex w-fit items-center gap-2 rounded-full bg-background px-3 py-[5px] uppercase shadow-md">
            <Heart />
            <h2 className="font-bold">Meus Favoritos</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {userFavorites.map((favorite) => (
            <ProductItem
              key={favorite.product.id}
              product={favorite.product}
              className="min-w-full"
              userFavorites={JSON.parse(JSON.stringify(userFavorites))}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyFavoritesPage;
