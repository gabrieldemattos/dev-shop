"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toggleFavoriteProduct } from "../_actions/toggle-favorite-product";
import { toast } from "sonner";
import { UserFavoriteProduct } from "@prisma/client";
import { Heart } from "lucide-react";
import { cn } from "../_lib/utils";

interface ToggleFavoriteButtonProps {
  userFavorites: UserFavoriteProduct[];
  productId: string;
  className?: string;
}

const ToggleFavoriteButton = ({
  userFavorites,
  productId,
  className,
}: ToggleFavoriteButtonProps) => {
  const { data } = useSession();

  const router = useRouter();

  const isFavorite = userFavorites.some(
    (favorite) => favorite.productId === productId,
  );

  const handleFavoriteClick = async () => {
    if (!data) return router.push("/login");

    try {
      await toggleFavoriteProduct(productId, data?.user?.id as string);
      toast(
        isFavorite
          ? "Produto removido dos favoritos!"
          : "Produto favoritado com sucesso!",
        {
          position: "bottom-center",
          action: {
            label: "Ver favoritos",
            onClick: () => router.push("/my-favorites"),
          },
        },
      );
    } catch (error) {
      toast.error("Erro ao favoritar o restaurante");
    }
  };

  return (
    <div
      className={cn(
        "absolute z-50 flex cursor-pointer items-center justify-center rounded-full bg-white p-2 shadow-lg",
        className,
      )}
      onClick={handleFavoriteClick}
    >
      <Heart
        data-favorite={isFavorite}
        className="hover:fill-primary hover:stroke-primary data-[favorite=true]:fill-primary data-[favorite=true]:stroke-primary"
      />
    </div>
  );
};

export default ToggleFavoriteButton;
