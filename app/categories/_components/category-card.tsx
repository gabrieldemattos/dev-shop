import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="w-full rounded-md bg-background lg:bg-linear-secondary lg:px-3"
    >
      <div className="flex items-center justify-between pl-3 lg:flex-col lg:pb-5 lg:pl-0">
        <div className="lg: text-lg font-bold lg:order-2 lg:flex lg:max-h-fit lg:min-h-14 lg:w-[80%] lg:items-center lg:justify-center lg:rounded lg:bg-linear-primary lg:p-2 lg:text-center lg:text-sm lg:text-white lg:shadow lg:transition-all lg:hover:shadow-xl">
          <span className="lg:w-full">{category.name}</span>
        </div>

        <div className="relative aspect-square min-h-[90px] w-[90px] rounded-md bg-linear-primary lg:min-h-[280px] lg:w-[210px] lg:bg-linear-secondary xl:w-[250px]">
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            sizes="100%"
            className="object-contain"
            quality={100}
          />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
