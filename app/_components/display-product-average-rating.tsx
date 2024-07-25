import { StarIcon } from "lucide-react";
import { cn } from "../_lib/utils";

interface DisplayProductAverageRatingProps {
  totalStars: number;
  iconSize: number;
  averageRating: number;
  className?: string;
}

const DisplayProductAverageRating = ({
  totalStars,
  iconSize,
  averageRating,
  className,
}: DisplayProductAverageRatingProps) => {
  return (
    <>
      {Array.from({ length: totalStars }).map((_, index) => (
        <StarIcon
          key={index}
          size={iconSize}
          className={cn(
            `${
              averageRating && index < averageRating
                ? "fill-primary text-primary"
                : "fill-gray-200 text-gray-200"
            }`,
            className,
          )}
        />
      ))}
    </>
  );
};

export default DisplayProductAverageRating;
