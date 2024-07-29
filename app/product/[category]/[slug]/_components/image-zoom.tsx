"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";

interface ImageZoomProps {
  imageUrl: string;
  productName: string;
  isImageZoomed: boolean;
  setIsImageZoomed: Dispatch<SetStateAction<boolean>>;
}

const ImageZoom = ({
  imageUrl,
  productName,
  isImageZoomed,
  setIsImageZoomed,
}: ImageZoomProps) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsImageZoomed(false);
      }
    };

    if (isImageZoomed) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isImageZoomed, setIsImageZoomed]);

  if (!isImageZoomed) return null;

  return (
    <div
      data-state={isImageZoomed}
      className="fixed left-0 top-0 z-[100] hidden h-full w-full items-center justify-center bg-black/80 data-[state=true]:flex"
    >
      <div
        className="absolute right-0 top-0 h-full w-full cursor-pointer"
        onClick={() => setIsImageZoomed(false)}
      ></div>

      <Image
        src={imageUrl}
        alt={productName}
        height={0}
        width={0}
        sizes="100vw"
        className="z-[200] h-auto max-h-[90%] w-full min-w-[50%] max-w-full bg-background object-contain md:w-auto lg:max-h-[50%]"
      />
    </div>
  );
};

export default ImageZoom;
