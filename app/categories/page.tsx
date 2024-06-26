import Header from "../_components/header";
import { db } from "../_lib/prisma";
import CategoryCard from "./_components/category-card";

const CategoriesPage = async () => {
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  return (
    <>
      <div className="mb-8">
        <Header />
      </div>
      <div className="flex flex-col gap-4 px-5">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </>
  );
};

export default CategoriesPage;
