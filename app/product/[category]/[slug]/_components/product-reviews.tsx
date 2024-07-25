import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Prisma } from "@prisma/client";
import { ChevronRight, ThumbsUp } from "lucide-react";
import ReviewDetails from "./review-details";

interface ProductReviewsProps {
  reviews: Prisma.ReviewGetPayload<{
    include: {
      user: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductReviews = ({ reviews }: ProductReviewsProps) => {
  const lastReview = reviews?.[reviews.length - 1];

  const orderedReviews = [...reviews].reverse();

  return (
    <div className="flex flex-col" id="reviews">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">Última avaliação</h2>

        <div className="flex items-center gap-1 font-semibold text-muted-foreground">
          <Dialog>
            <DialogTrigger className="flex items-center gap-1">
              Ver mais <ChevronRight />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">
                  Todas as avaliações
                </DialogTitle>
                <DialogDescription className="text-center">
                  Veja abaixo o que as pessoas estão achando deste produto.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-5 space-y-4">
                {orderedReviews.map((review) => (
                  <ReviewDetails
                    key={review.id}
                    separator
                    userName={review.user.name!}
                    userRating={review.rating}
                    userComment={review.comment}
                    createdAt={review.createdAt}
                  />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <ReviewDetails
        key={lastReview.id}
        userName={lastReview.user.name!}
        userRating={lastReview.rating}
        userComment={lastReview.comment}
        createdAt={lastReview.createdAt}
      />

      <div className="mt-6 flex flex-col items-start gap-2">
        <p className="text-xs font-light text-muted-foreground">
          2 pessoas acharam esta avaliação útil
        </p>

        <Button variant="ghost" className="gap-2 p-0 text-muted-foreground">
          Marcar como útil <ThumbsUp size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ProductReviews;
