import { cn } from "@/app/_lib/utils";
import Image, { ImageProps } from "next/image";

interface BannerProps extends ImageProps {
  className?: string;
}

const Banner = ({ alt, className, ...props }: BannerProps) => {
  return (
    <Image
      height={0}
      width={0}
      className={cn(
        "h-auto w-full rounded-xl lg:h-[500px] lg:rounded-none 2xl:rounded-xl",
        className,
      )}
      sizes="100vw"
      alt={alt}
      {...props}
    />
  );
};

export default Banner;
