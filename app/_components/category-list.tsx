import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({
    where: { isVisible: true },
    take: 4,
    orderBy: { name: "asc" },
  });

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
