import Products from "./_components/products";
import { getServerSession } from "next-auth";
import { authOptions } from "../../_lib/auth";
import { db } from "../../_lib/prisma";

const SearchPage = async () => {
  const session = await getServerSession(authOptions);

  const userFavorites = session
    ? await db.userFavoriteProduct.findMany({
        where: {
          userId: session?.user?.id,
        },
      })
    : [];

  return (
    <>
      <Products userFavorites={userFavorites} />
    </>
  );
};

export default SearchPage;
