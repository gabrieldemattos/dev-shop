import { Prisma } from "@prisma/client";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { cn } from "../_lib/utils";

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
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <div className={cn("flex min-h-[150px] w-[150px] flex-col", className)}>
      <div
        className={cn(
          "relative aspect-square min-h-[150px] w-[150px] rounded-lg bg-linear-secondary p-2",
          className,
        )}
      >
        <Link href={`/product/${product.category.slug}/${product.slug}`}>
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            sizes="100%"
            className="object-contain transition-all hover:scale-110"
            quality={100}
          />

          {product.discountPercentage > 0 && (
            <Badge className="absolute left-0 top-5 rounded-l-none border-none bg-linear-primary py-1 pl-1 pr-3 text-base font-bold text-background shadow-md">
              -{product.discountPercentage}%
            </Badge>
          )}
        </Link>

        <div className="absolute -bottom-5 right-1 z-50 flex items-center justify-center rounded-full bg-white p-2 shadow-lg">
          <Heart className="cursor-pointer hover:fill-primary hover:stroke-primary" />
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
    </div>
  );
};

export default ProductItem;
