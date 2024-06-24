import { Badge } from "@/app/_components/ui/badge";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Product } from "@prisma/client";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-lg font-semibold">{product.name}</p>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold text-red-600">
            {formatCurrency(calculateProductTotalPrice(product))}
          </p>

          {product.discountPercentage > 0 && (
            <Badge className="w-fit border-none bg-linear-primary px-2 py-1 text-xs font-bold text-background shadow-md">
              -{product.discountPercentage}%
            </Badge>
          )}
        </div>

        {product.discountPercentage > 0 && (
          <p className="truncate text-base text-gray-400">
            De:{" "}
            <span className="line-through">
              {formatCurrency(Number(product.basePrice))}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
