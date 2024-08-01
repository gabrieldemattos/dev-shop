"use client";

import { Button } from "@/app/_components/ui/button";
import { useLikeDeslikeReview } from "@/app/_hooks/useLikeDeslikeReview";
import { ThumbsDown, ThumbsUp } from "lucide-react";

interface LikeUnlikeButtonProps {
  reviewId: string;
  categorySlug: string;
  productSlug: string;
  findLike: string | undefined;
}

const LikeUnlikeButton = ({
  reviewId,
  categorySlug,
  productSlug,
  findLike,
}: LikeUnlikeButtonProps) => {
  const { handleLikeUnlikeReviewClick, isLikeDislikeLoading } =
    useLikeDeslikeReview(reviewId, categorySlug, productSlug, findLike);

  return (
    <Button
      key={findLike}
      variant="ghost"
      className="p-0 hover:bg-transparent"
      onClick={handleLikeUnlikeReviewClick}
      disabled={isLikeDislikeLoading}
    >
      {findLike ? (
        <span className="flex items-center gap-2 p-0 text-blue-500 hover:bg-transparent hover:text-blue-400">
          Descurtir <ThumbsDown size={18} />
        </span>
      ) : (
        <span className="flex items-center gap-2 p-0 text-muted-foreground hover:text-blue-500">
          Marcar como útil <ThumbsUp size={18} />
        </span>
      )}
    </Button>
  );
};

export default LikeUnlikeButton;
