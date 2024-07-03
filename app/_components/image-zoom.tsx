"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

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
  return (
    <div
      data-state={isImageZoomed}
      className="fixed z-[100] hidden h-full w-full items-center justify-center bg-black/80 data-[state=true]:flex"
    >
      <Button
        className="absolute right-5 top-5 border-none bg-transparent text-white hover:bg-transparent hover:text-gray-400"
        size="icon"
        variant="outline"
        onClick={() => setIsImageZoomed(false)}
      >
        <X size={30} />
      </Button>

      <Image
        src={imageUrl}
        alt={productName}
        height={0}
        width={0}
        sizes="100vw"
        className="h-auto max-h-[90%] w-full min-w-[50%] max-w-full bg-background object-contain md:w-auto"
      />
    </div>
  );
};

export default ImageZoom;
