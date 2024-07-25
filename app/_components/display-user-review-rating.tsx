"use client";

import { StarIcon } from "lucide-react";
import { cn } from "../_lib/utils";

interface DisplayUserReviewRatingProps {
  totalStars: number;
  iconSize: number;
  userRating: number;
  className?: string;
}

const DisplayUserReviewRating = ({
  totalStars,
  iconSize,
  userRating,
  className,
}: DisplayUserReviewRatingProps) => {
  return (
    <>
      {Array.from({ length: totalStars }).map((_, index) => (
        <StarIcon
          key={index}
          size={iconSize}
          className={cn(
            `${
              userRating && index < userRating
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

export default DisplayUserReviewRating;
