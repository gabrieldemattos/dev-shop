import { useSession } from "next-auth/react";
import { unlikeReview } from "../_actions/review-unlike";
import { likeReview } from "../_actions/review-like";
import { toast } from "sonner";
import { useState } from "react";

export const useLikeDeslikeReview = (
  reviewId: string,
  categorySlug: string,
  productSlug: string,
  isLike: string | undefined,
) => {
  const { data } = useSession();

  const [isLikeDislikeLoading, setIsLikeDislikeLoading] = useState(false);

  const handleLikeUnlikeReviewClick = async () => {
    if (!data) {
      toast.error("Você precisa fazer login para curtir uma avaliação.", {
        position: "bottom-center",
      });
      return;
    }

    setIsLikeDislikeLoading(true);
    try {
      if (isLike) {
        await unlikeReview(
          data.user.id as string,
          reviewId,
          categorySlug,
          productSlug,
        );
      } else {
        await likeReview(
          data.user.id as string,
          reviewId,
          categorySlug,
          productSlug,
        );
      }
    } catch (error) {
      toast.error("Erro ao curtir/descurtir a avaliação", {
        position: "bottom-center",
      });
    } finally {
      setIsLikeDislikeLoading(false);
    }
  };

  return { handleLikeUnlikeReviewClick, isLikeDislikeLoading };
};
