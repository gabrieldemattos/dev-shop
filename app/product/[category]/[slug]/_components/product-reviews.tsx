import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Prisma } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import ReviewDetails from "./review-details";
import { getUserLikedReviews } from "@/app/_actions/get-user-liked-reviews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

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
  categorySlug: string;
  productSlug: string;
}

const ProductReviews = async ({
  reviews,
  categorySlug,
  productSlug,
}: ProductReviewsProps) => {
  const session = await getServerSession(authOptions);

  const lastReview = reviews?.[reviews.length - 1];

  const orderedReviews = [...reviews].reverse();

  const getUserLikes = await getUserLikedReviews(session?.user?.id as string);

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
                    review={review}
                    userLikes={getUserLikes}
                    likeCount={review.likeCount}
                    categorySlug={categorySlug}
                    productSlug={productSlug}
                    separator
                  />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <ReviewDetails
        review={lastReview}
        userLikes={getUserLikes}
        likeCount={lastReview?.likeCount}
        categorySlug={categorySlug}
        productSlug={productSlug}
      />
    </div>
  );
};

export default ProductReviews;
