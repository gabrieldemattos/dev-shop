"use client";

import { StarIcon } from "lucide-react";
import { cn } from "../_lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface RatingSelectorProps {
  totalStars: number;
  iconSize: number;
  selectedRating?: number;
  className?: string;
  handleRating?: (currentRating: number) => void;
}

const RatingSelector = ({
  totalStars,
  iconSize,
  selectedRating,
  className,
  handleRating,
}: RatingSelectorProps) => {
  const [rating, setRating] = useState<number>(0);

  const handleClickRating = (currentRating: number) =>
    setRating((prev) => (prev === currentRating ? 0 : currentRating));

  useEffect(() => {
    if (handleRating) return handleRating(rating);
  }, [rating, handleRating]);

  return (
    <>
      {Array.from({ length: totalStars }).map((_, index) => (
        <Button
          onClick={
            handleRating ? () => handleClickRating(index + 1) : undefined
          }
          key={index}
          variant="link"
          className="p-0"
        >
          <StarIcon
            key={selectedRating}
            size={iconSize}
            className={cn(
              `${
                selectedRating && index < selectedRating
                  ? "fill-primary text-primary"
                  : "fill-gray-200 text-gray-200"
              }`,
              className,
            )}
          />
        </Button>
      ))}
    </>
  );
};

export default RatingSelector;
