import { List } from "lucide-react";
import Header from "../_components/header";
import { db } from "../../_lib/prisma";
import CategoryCard from "./_components/category-card";
import Title from "../_components/title";

const CategoriesPage = async () => {
  const categories = await db.category.findMany({
    where: { isVisible: true },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <div className="mb-8 lg:mb-0">
        <Header />
      </div>

      <div className="flex flex-col gap-4 px-5 lg:grid lg:grid-cols-4 xl:px-20 2xl:px-64">
        <Title icon={<List />} title="Categorias" />

        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </>
  );
};

export default CategoriesPage;
