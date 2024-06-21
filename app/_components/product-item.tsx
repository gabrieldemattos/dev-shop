import { Prisma, Product } from "@prisma/client";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          slug: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link
      href={`/product/${product.category.slug}/${product.slug}`}
      className="flex min-h-[150px] w-[150px] flex-col"
    >
      <div className="bg-linear-secondary relative aspect-square min-h-[150px] w-[150px] rounded-lg p-2">
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          fill
          sizes="100%"
          className="object-contain transition-all hover:scale-110"
          quality={100}
        />

        <Badge className="bg-linear-primary absolute left-0 top-5 rounded-l-none border-none py-1 pl-1 pr-3 text-base font-bold text-background shadow-md">
          -{product.discountPercentage}%
        </Badge>

        <div className="absolute -bottom-5 right-1 flex items-center justify-center rounded-full bg-white p-2 shadow-lg">
          <Heart className="hover:fill-primary hover:stroke-primary" />
        </div>
      </div>

      <div className="mt-2 flex gap-1">
        <Star size={12} className="fill-primary text-primary" />
        <Star size={12} className="fill-primary text-primary" />
        <Star size={12} className="fill-primary text-primary" />
        <Star size={12} className="fill-primary text-primary" />
        <Star size={12} className="fill-primary text-primary" />
      </div>

      <p className="truncate">{product.name}</p>

      <div className="flex items-center gap-2">
        <p className="text-base font-bold text-red-600">
          {formatCurrency(calculateProductTotalPrice(product))}
        </p>

        <p className="truncate text-xs text-gray-400 line-through">
          {formatCurrency(Number(product.basePrice))}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
