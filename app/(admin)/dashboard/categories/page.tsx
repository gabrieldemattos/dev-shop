import CategoriesList from "./_components/categories-list";
import { db } from "@/app/_lib/prisma";

const AdminCategoriesPage = async () => {
  const categories = await db.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="max-h-[850px] overflow-y-auto rounded-md bg-gray-200 bg-opacity-90 p-8 shadow-lg lg:w-[800px] xl:w-full">
        <CategoriesList categories={categories} />
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
