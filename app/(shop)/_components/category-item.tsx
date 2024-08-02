import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="flex flex-col justify-around space-y-2 rounded-lg bg-background px-2 py-3 transition-all hover:bg-primary-foreground hover:text-accent-foreground"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={0}
        width={0}
        className="max-h-[80px] w-full object-contain"
        sizes="100%"
        quality={100}
      />

      <p className="truncate px-1 text-center text-sm font-semibold">
        {category.name}
      </p>
    </Link>
  );
};

export default CategoryItem;
