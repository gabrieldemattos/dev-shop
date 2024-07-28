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
import { Prisma } from "@prisma/client";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          slug: true;
        };
      };
    };
  }>[];
}

const ProductList = async ({ products }: ProductListProps) => {
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
