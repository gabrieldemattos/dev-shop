"use client";

import { formatCurrency } from "@/app/(shop)/_helpers/price";
import {
  DollarSign,
  Edit,
  Heart,
  Info,
  Percent,
  ShoppingCart,
  Star,
  Tags,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ParagraphProductInfo from "./paragraph-product-info";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import Link from "next/link";
import { useProducts } from "@/app/(admin)/_hooks/useProducts";
import { IProduct } from "@/app/(admin)/_interface/Products";
import EditProduct from "./edit-product";
import { Category } from "@prisma/client";

interface ProductCardProps {
  product: IProduct;
  categories: Category[];
  revalidateProducts: () => void;
}

const ProductCard = ({
  product,
  categories,
  revalidateProducts,
}: ProductCardProps) => {
  const [showMore, setShowMore] = useState(false);
  const [mainImage, setMainImage] = useState<string>(product.imageUrls[0]);

  const [openEditProduct, setOpenEditProduct] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>(
    {} as IProduct,
  );

  const handleEditProdu = (product: IProduct) => {
    setSelectedProduct(product);
    setOpenEditProduct(true);
  };

  const { handleDeleteProduct } = useProducts();

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleDeleteProductClick = async (id: string) => {
    await handleDeleteProduct(product.id);

    revalidateProducts();
  };

  return (
    <div className="flex flex-col rounded-lg border-2 border-gray-200 bg-white p-4 shadow-lg transition duration-200 hover:border-primary hover:shadow-xl">
      <Link
        href={`/product/${product.category.slug}/${product.slug}`}
        className="relative mb-4 aspect-square h-48 w-full rounded"
      >
        <Image
          src={mainImage}
          alt={product.name}
          fill
          sizes="100%"
          className="object-contain"
        />
      </Link>

      <div className="mb-4 flex justify-center space-x-2">
        {product.imageUrls.map((image, index) => (
          <div
            data-image-url={image === mainImage ? true : false}
            className="relative h-12 w-12 cursor-pointer rounded data-[image-url=true]:border-2 data-[image-url=true]:border-primary"
            key={index}
          >
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="100%"
              className="object-contain"
              onClick={() => setMainImage(image)}
            />
          </div>
        ))}
      </div>

      <h2 className="text-base font-bold lg:text-xl">{product.name}</h2>

      <div className="py-4">
        <Separator />
      </div>

      <div className="h-auto flex-1">
        <ParagraphProductInfo
          icon={<Tags className="mr-1 inline" />}
          text={product.category.name}
          label="Categoria"
        />

        <ParagraphProductInfo
          icon={<DollarSign className="mr-1 inline" />}
          text={formatCurrency(Number(product.basePrice))}
          label="Preço"
        />

        <ParagraphProductInfo
          icon={<Percent className="mr-1 inline" />}
          text={product.discountPercentage + "%"}
          label="Desconto"
        />

        <ParagraphProductInfo
          icon={<Info className="mr-1 inline" />}
          text={product.status === "ACTIVE" ? "Em Estoque" : "Fora de Estoque"}
          label="Status"
        />

        <ParagraphProductInfo
          icon={<Star className="mr-1 inline" />}
          text={product.averageRating}
          label="Avaliação Média"
        />

        <p className="mb-2 text-gray-700">
          {showMore
            ? product.description
            : `${product.description.substring(0, 100)}...`}
        </p>

        <button onClick={toggleShowMore} className="text-blue-500">
          {showMore ? "Ver menos" : "Ver mais..."}
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-4">
        <Button
          variant="outline"
          className="flex w-full items-center rounded bg-green-500 px-4 py-2 text-white transition duration-200 hover:bg-green-600 hover:text-white"
          onClick={() => handleEditProdu(product)}
        >
          <Edit className="mr-2" /> Editar Produto
        </Button>

        <Button
          className="flex w-full items-center rounded bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-600 hover:text-white"
          onClick={() => handleDeleteProductClick(product.id)}
        >
          <Trash className="mr-2" /> Remover Produto
        </Button>
      </div>

      <div className="mt-4 space-y-2 text-gray-600">
        <p>
          <span className="font-semibold">
            <Star className="mr-1 inline" /> Avaliações:{" "}
          </span>
          {product._count.reviews}
        </p>

        <p>
          <span className="font-semibold">
            <ShoppingCart className="mr-1 inline" /> Compras:{" "}
          </span>
          {product._count.orderProduct}
        </p>

        <p>
          <span className="font-semibold">
            <Heart className="mr-1 inline" /> Favoritos:{" "}
          </span>
          {product._count.usersWhoFavorited}
        </p>
      </div>

      <EditProduct
        product={selectedProduct}
        openEditProduct={openEditProduct}
        setOpenEditProduct={setOpenEditProduct}
        categories={categories}
        revalidateProducts={revalidateProducts}
      />
    </div>
  );
};

export default ProductCard;
