"use client";

import ImageZoom from "@/app/_components/image-zoom";
import ToggleFavoriteButton from "@/app/_components/toggle-favorite-button";
import { Button } from "@/app/_components/ui/button";
import { UserFavoriteProduct } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductImagesProps {
  imageUrls: string[];
  productName: string;
  userFavorites: UserFavoriteProduct[];
  productId: string;
}

const ProductImages = ({
  imageUrls,
  productName,
  userFavorites,
  productId,
}: ProductImagesProps) => {
  const [activeImageUrl, setActiveImageUrl] = useState<string>(imageUrls[0]);
  const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);

  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <>
      <div className="flex h-full w-full flex-col space-y-4">
        <div className="relative w-full bg-linear-secondary">
          <div
            className="flex h-[380px] w-full cursor-pointer items-center justify-center shadow-md"
            onClick={() => setIsImageZoomed(true)}
          >
            <Image
              src={activeImageUrl}
              alt={productName}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-full max-w-[80%] object-contain"
            />
          </div>

          <Button
            size="icon"
            className="absolute left-2 top-2 rounded-full"
            variant="ghost"
            onClick={handleBackClick}
          >
            <ChevronLeft />
          </Button>

          <ToggleFavoriteButton
            userFavorites={userFavorites}
            productId={productId}
            className="absolute right-2 top-2"
          />
        </div>

        <div className="grid grid-cols-4 gap-4 px-5">
          {imageUrls.map((imageUrl) => (
            <button
              key={imageUrl}
              data-active={imageUrl === activeImageUrl}
              onClick={() => setActiveImageUrl(imageUrl)}
              className="flex h-[100px] items-center justify-center rounded-xl border-2 border-transparent bg-background object-contain shadow-md data-[active=true]:border-primary"
            >
              <Image
                src={imageUrl}
                alt={productName}
                height={0}
                width={0}
                sizes="100vw"
                className="h-auto max-h-[70%] w-auto max-w-[80%]"
              />
            </button>
          ))}
        </div>
      </div>

      <ImageZoom
        imageUrl={activeImageUrl}
        productName={productName}
        isImageZoomed={isImageZoomed}
        setIsImageZoomed={setIsImageZoomed}
      />
    </>
  );
};

export default ProductImages;
