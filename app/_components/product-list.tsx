import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import ProductItem from "./product-item";
import { authOptions } from "../_lib/auth";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const ProductList = async () => {
  const session = await getServerSession(authOptions);

  const products = await db.product.findMany({
    where: {
      status: "ACTIVE",
      discountPercentage: {
        not: 0,
      },
    },
    include: {
      category: {
        select: {
          slug: true,
        },
      },
    },
    take: 10,
    orderBy: {
      discountPercentage: "desc",
    },
  });

  const userFavorites = session
    ? await db.userFavoriteProduct.findMany({
        where: {
          userId: session?.user?.id,
        },
      })
    : [];

  return (
    <>
      <div className="flex w-full gap-4 overflow-x-auto px-5 lg:hidden [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            userFavorites={userFavorites}
          />
        ))}
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="hidden lg:block lg:w-full"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              className="lg:basis-1/4 xl:basis-1/5"
              key={product.id}
            >
              <ProductItem
                product={product}
                userFavorites={userFavorites}
                className="w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default ProductList;
