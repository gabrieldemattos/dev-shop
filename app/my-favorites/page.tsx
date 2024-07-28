import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import ProductItem from "../_components/product-item";
import { Heart } from "lucide-react";
import { redirect } from "next/navigation";
import Title from "../_components/title";

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

      <div className="p-8 lg:pt-0 xl:px-20 2xl:px-64">
        <div className="mb-8">
          <Title icon={<Heart />} title="Meus Favoritos" />
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
