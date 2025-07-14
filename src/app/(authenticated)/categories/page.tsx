import { CategoryCard } from "./category-card";
import { getCategories } from "@/app/dao/categories";

export default async function CategoriesPage() {
  const categories = await getCategories();

  const catchAllCategory = categories.find(
    (category) => category.type === "CATCH_ALL",
  );

  console.dir(catchAllCategory);

  return (
    <>
      {categories.length > 0 ? JSON.stringify(categories, null, 2) : "Empty"}
      {catchAllCategory && <CategoryCard category={catchAllCategory} />}
    </>
  );
}
