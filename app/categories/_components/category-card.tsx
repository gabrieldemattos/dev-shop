import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="w-full rounded-md bg-background">
        <div className="flex items-center justify-between pl-3">
          <span className="text-lg font-bold">{category.name}</span>

          <div className="bg-linear-primary relative aspect-square min-h-[90px] w-[90px] rounded-md">
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
      </div>
    </Link>
  );
};

export default CategoryCard;
