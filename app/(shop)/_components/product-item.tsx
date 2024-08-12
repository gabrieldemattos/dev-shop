"use client";

import { UserFavoriteProduct } from "@prisma/client";
import Image from "next/image";
import { Badge } from "@/app/_components/ui/badge";
import Link from "next/link";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { cn } from "../../_lib/utils";
import ToggleFavoriteButton from "./toggle-favorite-button";
import DisplayProductAverageRating from "./display-product-average-rating";
import { MAX_STARS_RATING } from "../_constants/max-stars-review";
import { IProductWithTotalReviews } from "../_interfaces/ProductWithTotalReviews";

interface ProductItemProps {
  product: IProductWithTotalReviews;
  className?: string;
  userFavorites: UserFavoriteProduct[];
}

const ProductItem = ({
  product,
  className,
  userFavorites,
}: ProductItemProps) => {
  return (
    <div className={cn("flex min-h-[150px] w-[150px] flex-col", className)}>
      <div
        className={cn(
          "relative aspect-square min-h-[150px] w-[150px] rounded-lg bg-linear-secondary p-2 shadow transition-all hover:shadow-[0_0_17px_0_rgba(0,0,0,0.25)]",
          className,
        )}
      >
        <Link href={`/product/${product.category.slug}/${product.slug}`}>
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            sizes="100%"
            className="object-contain"
            quality={100}
          />

          {product.discountPercentage > 0 && (
            <Badge className="absolute left-0 top-5 rounded-l-none border-none bg-linear-primary py-1 pl-1 pr-3 text-base font-bold text-background shadow-md">
              -{product.discountPercentage}%
            </Badge>
          )}
        </Link>

        <ToggleFavoriteButton
          userFavorites={userFavorites}
          productId={product.id}
          className="-bottom-5 right-1"
        />
      </div>

      <div className="mt-2 flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <DisplayProductAverageRating
            totalStars={MAX_STARS_RATING}
            iconSize={13}
            averageRating={product.averageRating}
          />
        </div>

        <span className="text-xs text-gray-400">
          ({product.totalReviews}{" "}
          {product.totalReviews === 1 ? "avaliação" : "avaliações"})
        </span>
      </div>

      <p className="truncate">{product.name}</p>

      <div className="flex items-center gap-2">
        <p className="text-base font-bold text-red-600">
          {formatCurrency(calculateProductTotalPrice(product))}
        </p>

        {product.discountPercentage > 0 && (
          <p className="truncate text-xs text-gray-400 line-through">
            {formatCurrency(Number(product.basePrice))}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
