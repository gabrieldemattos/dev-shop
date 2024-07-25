import DisplayUserReviewRating from "@/app/_components/display-user-review-rating";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Prisma, Review } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ProductReviewImage from "./product-review-image";

interface DisplayReviewProps {
  review: Review;
  product: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          slug: true;
        };
      };
    };
  }>;
}

const DisplayReview = ({ review, product }: DisplayReviewProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="h-0 p-3 text-xs">
          Ver Avaliação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            Sua avaliação sobre este produto
          </DialogTitle>
          <DialogDescription className="flex flex-col items-center gap-4 text-center">
            Veja a sua opinião sobre o produto abaixo
            <ProductReviewImage
              name={product.name}
              categorySlug={product.category.slug}
              productSlug={product.slug}
              imageUrl={product.imageUrls[0]}
            />
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 pb-4 pt-1">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Sua nota para o produto</h2>
            <div className="flex gap-2">
              <DisplayUserReviewRating
                iconSize={50}
                totalStars={5}
                userRating={review.rating}
              />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold">Comentário:</h2>
            {review.comment ? (
              <p className="text-muted-foreground">{review.comment}</p>
            ) : (
              <p className="italic text-muted-foreground">
                Você não deixou nenhum comentário sobre o produto
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisplayReview;
