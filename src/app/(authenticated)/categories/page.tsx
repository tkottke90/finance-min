import { CategoryCard } from "./category-card";
import { getCategories } from "@/app/dao/categories";
import { CategoryTable } from "./cateogory-table";

export default async function CategoriesPage() {
  const categories = await getCategories();

  const catchAllCategory = categories.find(
    (category) => category.type === "CATCH_ALL",
  );

  console.dir(catchAllCategory);

  return (
    <>
      {catchAllCategory && <CategoryCard category={catchAllCategory} />}
      <CategoryTable
        categories={categories.filter((cat) => cat.type !== "CATCH_ALL")}
      />
    </>
  );
}
