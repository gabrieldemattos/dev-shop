import CategoryList from "../_components/category-list";
import ProductList from "../_components/product-list";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import Banner from "./_components/banner";
import { fetchProductTotalReviews } from "../_helpers/fetch-product-total-reviews";

export default async function Home() {
  const productsOnOffer = await db.product.findMany({
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

  const productsOnOfferWithTotalReviews =
    await fetchProductTotalReviews(productsOnOffer);

  const computers = await db.product.findMany({
    where: {
      status: "ACTIVE",
      category: {
        name: "Computadores e Laptops",
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
  });

  const computersWithTotalReviews = await fetchProductTotalReviews(computers);

  const smartphonesAndTablets = await db.product.findMany({
    where: {
      status: "ACTIVE",
      category: {
        name: "Smartphones e Tablets",
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
  });

  const smartphonesAndTabletsWithTotalReviews = await fetchProductTotalReviews(
    smartphonesAndTablets,
  );

  return (
    <div className="space-y-8">
      <Header />

      <div className="space-y-8 2xl:px-64">
        <div className="px-5 2xl:hidden">
          <Banner
            src="/banner-02-free-delivery.png"
            alt="frete grátis"
            className="bg-black/80 py-5 lg:h-[500px]"
          />
        </div>

        <div className="hidden px-5 lg:px-0 2xl:block">
          <Banner src="/banner-free-delivery.png" alt="frete grátis" />
        </div>

        <div className="space-y-1 px-5 2xl:px-0">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-xl font-bold">Categorias</h2>

            <Link
              href="/categories"
              className="flex items-center gap-1 font-semibold text-muted-foreground"
            >
              <span>Ver mais</span>
              <ChevronRight />
            </Link>
          </div>

          <CategoryList />
        </div>

        <div className="space-y-1 pl-5 lg:px-16 2xl:p-0">
          <h2 className="text-xl font-bold">Ofertas</h2>

          <ProductList
            products={JSON.parse(
              JSON.stringify(productsOnOfferWithTotalReviews),
            )}
          />
        </div>

        <div className="px-5 py-2 lg:hidden">
          <Link href="/category/smartphones-and-tablets">
            <Banner
              src="/banner-discount-smartphones.png"
              alt="as melhores ofertas de smartphones"
            />
          </Link>
        </div>

        <div className="hidden gap-4 px-5 py-2 lg:grid lg:grid-cols-2">
          <Link href="/category/smartphones-and-tablets">
            <Banner
              src="/banner-discount-smartphones.png"
              alt="as melhores ofertas de smartphones"
              className="lg:h-[300px]"
            />
          </Link>

          <Link href="/category/computers-and-laptops">
            <Banner
              src="/banner-01.png"
              alt="seu novo computador está aqui, desconto de 30%"
              className="lg:h-[300px]"
            />
          </Link>
        </div>

        <div className="space-y-1 pl-5 lg:px-16 2xl:p-0">
          <h2 className="text-xl font-bold">Smartphones e Tablets</h2>

          <ProductList
            products={JSON.parse(
              JSON.stringify(smartphonesAndTabletsWithTotalReviews),
            )}
          />
        </div>

        <div className="px-5 py-2 lg:hidden">
          <Link href="/category/computers-and-laptops">
            <Banner
              src="/banner-01.png"
              alt="seu novo computador está aqui, desconto de 30%"
            />
          </Link>
        </div>

        <div className="space-y-1 pl-5 lg:px-16 2xl:p-0">
          <h2 className="text-xl font-bold">Computadores</h2>

          <ProductList
            products={JSON.parse(JSON.stringify(computersWithTotalReviews))}
          />
        </div>
      </div>
    </div>
  );
}
