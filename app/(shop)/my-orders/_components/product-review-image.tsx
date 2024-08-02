import Image from "next/image";
import Link from "next/link";

interface ProductReviewImageProps {
  name: string;
  categorySlug: string;
  productSlug: string;
  imageUrl: string;
}

const ProductReviewImage = ({
  name,
  categorySlug,
  productSlug,
  imageUrl,
}: ProductReviewImageProps) => {
  return (
    <>
      <Link
        href={`/product/${categorySlug}/${productSlug}`}
        className="relative flex min-h-[130px] w-[130px] items-center justify-center rounded-full border-2"
      >
        <Image
          src={imageUrl}
          alt={name}
          height={0}
          width={0}
          sizes="100%"
          className="h-[100px] w-[100px] object-contain"
          quality={100}
        />
      </Link>

      <span className="font-semibold italic">{name}</span>
    </>
  );
};

export default ProductReviewImage;
