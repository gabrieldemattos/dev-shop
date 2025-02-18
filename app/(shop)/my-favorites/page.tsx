import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { db } from "../../_lib/prisma";
import { authOptions } from "../../_lib/auth";
import ProductItem from "../_components/product-item";
import { Heart, HeartCrack } from "lucide-react";
import { redirect } from "next/navigation";
import Title from "../_components/title";
import { fetchProductTotalReviews } from "../_helpers/fetch-product-total-reviews";

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

  const userFavoritesWithTotalReviews = await fetchProductTotalReviews(
    userFavorites.map((product) => product.product),
  );

  return (
    <>
      <Header />

      <div className="p-8 lg:pt-0 xl:px-20 2xl:px-64">
        <div className="mb-8">
          <Title icon={<Heart />} title="Meus Favoritos" />
        </div>

        {userFavorites.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {userFavoritesWithTotalReviews.map((favorite) => (
              <ProductItem
                key={favorite.id}
                product={JSON.parse(JSON.stringify(favorite))}
                className="min-w-full"
                userFavorites={JSON.parse(JSON.stringify(userFavorites))}
              />
            ))}
          </div>
        ) : (
          <div className="mt-20 flex h-full flex-col items-center justify-center gap-6">
            <HeartCrack className="h-16 w-16 animate-bounce" />
            <h2 className="text-2xl font-semibold">
              Sua lista de favoritos está vazia.
            </h2>

            <p className="text-md text-gray-600">
              Que tal explorar nossos produtos e adicionar seus favoritos?
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default MyFavoritesPage;
