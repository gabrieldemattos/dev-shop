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
      variant="ghost"
      data-find={findLike}
      className="gap-2 p-0 text-muted-foreground hover:bg-transparent hover:text-blue-500 data-[find]:text-blue-500 data-[find]:hover:bg-transparent data-[find]:hover:text-blue-400"
      onClick={handleLikeUnlikeReviewClick}
      disabled={isLikeDislikeLoading}
    >
      {findLike ? (
        <>
          Descurtir <ThumbsDown size={18} />
        </>
      ) : (
        <>
          Marcar como útil <ThumbsUp size={18} />
        </>
      )}
    </Button>
  );
};

export default LikeUnlikeButton;
