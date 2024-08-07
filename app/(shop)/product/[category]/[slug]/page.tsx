import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImages from "./_components/product-images";
import ProductItem from "@/app/(shop)/_components/product-item";
import ProductDetails from "./_components/product-details";
import ProductStatus from "./_components/product-status";
import ProductReviews from "./_components/product-reviews";
import AddProductToCart from "./_components/add-product-to-cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/(shop)/_components/header";
import { fetchProductTotalReviews } from "@/app/(shop)/_helpers/fetch-product-total-reviews";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";

interface ProductPageProps {
  params: {
    category: string;
    slug: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const session = await getServerSession(authOptions);

  const userFavorites = session
    ? await db.userFavoriteProduct.findMany({
        where: {
          userId: session?.user?.id,
        },
      })
    : [];

  const product = await db.product.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      category: {
        select: {
          slug: true,
        },
      },
      reviews: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const relatedProducts = await db.product.findMany({
    where: {
      category: {
        slug: params.category,
      },
      status: "ACTIVE",
    },
    include: {
      category: true,
    },
    orderBy: {
      discountPercentage: "desc",
    },
    take: 10,
  });

  const relatedProductsWithTotalReviews =
    await fetchProductTotalReviews(relatedProducts);

  const relatedProductsFiltered = relatedProductsWithTotalReviews.filter(
    (relatedProduct) => relatedProduct.slug !== params.slug,
  );

  if (!product) return notFound();

  return (
    <>
      <Header />

      <div className="flex flex-col gap-4 lg:hidden">
        <ProductImages
          imageUrls={product.imageUrls}
          productName={product.name}
          userFavorites={userFavorites}
          productId={product.id}
        />

        <div className="flex flex-col space-y-4 px-5">
          <ProductStatus
            totalReviews={product.reviews.length}
            productId={product.id}
            status={product.status}
          />

          <ProductDetails product={product} />

          <AddProductToCart product={JSON.parse(JSON.stringify(product))} />

          <div className="py-4">
            <h2 className="text-lg font-bold">Descrição</h2>

            <span className="text-sm text-muted-foreground">
              {product.description}
            </span>
          </div>

          {product.reviews.length > 0 && (
            <ProductReviews
              reviews={product.reviews}
              categorySlug={product.category.slug}
              productSlug={params.slug}
            />
          )}
        </div>

        <div className="space-y-4 pl-5 text-lg font-bold">
          <h2>Produtos Relacionados</h2>

          <div className="flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {relatedProductsFiltered.map((relatedProduct, index) => (
              <ProductItem
                key={index}
                product={JSON.parse(JSON.stringify(relatedProduct))}
                userFavorites={userFavorites}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10 hidden lg:block lg:px-5 xl:px-20 2xl:px-64">
        <div className="flex flex-col space-y-4">
          <div className="flex">
            <ProductImages
              imageUrls={product.imageUrls}
              productName={product.name}
              userFavorites={userFavorites}
              productId={product.id}
            />

            <div className="flex min-w-[500px] max-w-[1000px] flex-col rounded rounded-bl-none rounded-tl-none border-b-2 bg-linear-secondary p-5 pb-10">
              <div className="h-auto flex-1 space-y-7">
                <ProductStatus
                  totalReviews={product.reviews.length}
                  productId={product.id}
                  status={product.status}
                />

                <ProductDetails product={product} />
              </div>

              <AddProductToCart product={JSON.parse(JSON.stringify(product))} />
            </div>
          </div>

          <div className="rounded bg-linear-secondary p-5 shadow">
            <h2 className="text-lg font-bold">Descrição</h2>

            <span className="text-sm text-muted-foreground">
              {product.description}
            </span>
          </div>

          {product.reviews.length > 0 && (
            <div className="flex items-center justify-center">
              <div className="w-[440px] rounded bg-linear-secondary p-5 shadow">
                <ProductReviews
                  reviews={product.reviews}
                  categorySlug={product.category.slug}
                  productSlug={params.slug}
                />
              </div>
            </div>
          )}

          <div className="space-y-4 px-10">
            <h2 className="text-lg font-bold">Produtos Relacionados</h2>

            <Carousel
              opts={{
                align: "start",
              }}
              className="hidden lg:block lg:w-full"
            >
              <CarouselContent>
                {relatedProductsFiltered.map((product, index) => (
                  <CarouselItem
                    className="lg:basis-1/4 xl:basis-1/5"
                    key={index}
                  >
                    <ProductItem
                      product={JSON.parse(JSON.stringify(product))}
                      userFavorites={userFavorites}
                      className="w-full"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
