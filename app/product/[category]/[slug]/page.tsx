import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImages from "./_components/product-images";
import ProductItem from "@/app/_components/product-item";
import ProductDetails from "./_components/product-details";
import ProductStatus from "./_components/product-status";
import ProductReviews from "./_components/product-reviews";
import AddProductToCart from "./_components/add-product-to-cart";

interface ProductPageProps {
  params: {
    category: string;
    slug: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
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
    },
  });

  const relatedProducts = await db.product.findMany({
    where: {
      category: {
        slug: params.category,
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      discountPercentage: "desc",
    },
    take: 10,
  });

  const relatedProductsFiltered = relatedProducts.filter(
    (relatedProduct) => relatedProduct.slug !== params.slug,
  );

  if (!product) return notFound();

  return (
    <div className="flex flex-col gap-4">
      <ProductImages imageUrls={product.imageUrls} productName={product.name} />

      <div className="flex flex-col space-y-4 px-5">
        <ProductStatus />

        <ProductDetails product={product} />

        <AddProductToCart product={JSON.parse(JSON.stringify(product))} />

        <div className="py-4">
          <h2 className="text-lg font-bold">Descrição</h2>

          <span className="text-sm text-muted-foreground">
            {product.description}
          </span>
        </div>

        <ProductReviews />
      </div>

      <div className="space-y-4 pl-5 text-lg font-bold">
        <h2>Produtos Relacionados</h2>

        <div className="flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {relatedProductsFiltered.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
