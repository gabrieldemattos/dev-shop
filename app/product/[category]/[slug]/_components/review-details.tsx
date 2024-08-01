import DisplayUserReviewRating from "@/app/_components/display-user-review-rating";
import { Separator } from "@/app/_components/ui/separator";
import { MAX_STARS_RATING } from "@/app/_constants/max-stars-review";
import { formatDate, formatHour } from "@/app/_helpers/format-date";
import { Prisma } from "@prisma/client";
import LikeUnlikeButton from "./like-unlike-button";

interface ReviewDetailsProps {
  review: Prisma.ReviewGetPayload<{
    include: {
      user: {
        select: {
          name: true;
        };
      };
    };
  }>;
  userLikes: string[];
  likeCount: number;
  categorySlug: string;
  productSlug: string;
  separator?: boolean;
}

const ReviewDetails = async ({
  review,
  userLikes,
  likeCount,
  categorySlug,
  productSlug,
  separator = false,
}: ReviewDetailsProps) => {
  const findLike = userLikes?.find((like) => like === review.id);

  return (
    <div className="space-y-2">
      <p className="text-base font-bold">{review.user.name}</p>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <DisplayUserReviewRating
            totalStars={MAX_STARS_RATING}
            iconSize={15}
            userRating={review.rating}
          />
        </div>

        <span className="text-xs font-semibold text-gray-400">
          {formatDate(review.createdAt)} às{" "}
          {formatHour(review.createdAt, "America/Sao_Paulo")}h
        </span>
      </div>

      <div>
        {review.comment ? (
          <span className="break-words text-sm text-muted-foreground">
            {review.comment}
          </span>
        ) : (
          <span className="break-words text-sm italic text-muted-foreground">
            Usuário não deixou nenhum comentário sobre o produto
          </span>
        )}
      </div>

      <div className="flex flex-col items-start pt-3 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-light text-muted-foreground">
          {likeCount === 1
            ? "1 pessoa achou esta avaliação útil"
            : `${likeCount} pessoas acharam esta avaliação útil`}
        </p>

        <LikeUnlikeButton
          reviewId={review.id}
          categorySlug={categorySlug}
          productSlug={productSlug}
          findLike={findLike}
        />
      </div>

      {separator && <Separator />}
    </div>
  );
};

export default ReviewDetails;
