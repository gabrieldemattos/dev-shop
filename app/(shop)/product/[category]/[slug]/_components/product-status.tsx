import DisplayProductAverageRating from "@/app/(shop)/_components/display-product-average-rating";
import { MAX_STARS_RATING } from "@/app/(shop)/_constants/max-stars-review";
import { db } from "@/app/_lib/prisma";
import Link from "next/link";

interface ProductStatusProps {
  totalReviews: number;
  productId: string;
}

const ProductStatus = async ({
  totalReviews,
  productId,
}: ProductStatusProps) => {
  const getAverageRating = await db.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      averageRating: true,
    },
  });

  return (
    <div className="flex items-center justify-between">
      <Link className="flex items-center gap-2" href="#reviews">
        <div className="flex gap-1">
          <DisplayProductAverageRating
            totalStars={MAX_STARS_RATING}
            iconSize={20}
            averageRating={getAverageRating!.averageRating}
          />
        </div>

        <span className="font-semibold text-gray-400">
          {totalReviews === 1
            ? `${totalReviews} avaliação`
            : `${totalReviews} avaliações`}
        </span>
      </Link>

      <span className="font-semibold text-green-600">Em estoque</span>
    </div>
  );
};

export default ProductStatus;
