"use client";

import { createReview } from "@/app/_actions/create-review";
import RatingSelector from "@/app/_components/rating-selector";
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
import { Prisma } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import ProductReviewImage from "./product-review-image";
import { MAX_STARS_RATING } from "@/app/_constants/max-stars-review";

interface CreateReviewProps {
  orderProductId: string;
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

const CreateReview = ({ orderProductId, product }: CreateReviewProps) => {
  const { data } = useSession();

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSendingReview, setIsSendingReview] = useState<boolean>(false);

  const handleRating = (currentRating: number) => setRating(currentRating);

  const handleCreateReviewClick = async () => {
    if (!data?.user.id) return;

    if (!rating)
      return toast("Avalie o pedido!", {
        description: "Selecione uma estrela para avaliar o pedido.",
        position: "bottom-center",
      });

    try {
      setIsSendingReview(true);
      await createReview({
        user: {
          connect: { id: data.user.id },
        },
        product: {
          connect: { id: product.id },
        },
        orderProduct: {
          connect: { id: orderProductId },
        },
        rating,
        comment,
      });

      toast.success("Avaliação enviada com sucesso!", {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error("Erro ao avaliar seu pedido, tente novamente!");
      console.log(error);
    } finally {
      setIsSendingReview(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-0 p-3 text-xs">
          Avaliar Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Avalie este produto</DialogTitle>
          <DialogDescription className="flex flex-col items-center gap-4 text-center">
            Compartilhe sua experiência com o produto abaixo
            <ProductReviewImage
              name={product.name}
              categorySlug={product.category.slug}
              productSlug={product.slug}
              imageUrl={product.imageUrls[0]}
            />
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-10 pb-4 pt-1">
          <div className="flex flex-col items-center space-y-3">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">
                O que você achou do seu pedido?
              </h2>

              <p className="text-muted-foreground">
                Escolha de 1 a 5 estrelas para classificar.
              </p>
            </div>

            <div className="flex gap-2">
              <RatingSelector
                totalStars={MAX_STARS_RATING}
                iconSize={50}
                handleRating={handleRating}
                averageRating={rating}
                className="cursor-pointer hover:fill-primary hover:text-primary"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">Deixar comentário</h2>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte-nos sobre sua experiência (opcional)"
              className="w-full resize-none rounded-sm border bg-transparent p-3 outline-none"
              maxLength={100}
              rows={3}
            />

            <span className="text-sm text-muted-foreground">
              Max. de caracteres: {comment.length}/100
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isSendingReview}
            onClick={handleCreateReviewClick}
            className="uppercase"
          >
            {isSendingReview && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Enviar Avaliação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReview;
