import { CategoryCard } from "./category-card";
import { getCategories } from "@/app/dao/categories";
import { CategoryTable } from "./cateogory-table";

const activeCycleColors = [
  "text-black",
  "bg-illuminating-emerald-200",
  "border-illuminating-emerald-300",
  "dark:bg-illuminating-emerald-600",
  "dark:border-illuminating-emerald-500",
  "dark:text-white",
].join(" ");

export default async function CategoriesPage() {
  const categories = await getCategories();

  const catchAllCategory = categories.find(
    (category) => category.type === "CATCH_ALL",
  );

  return (
    <>
      {catchAllCategory && (
        <CategoryCard
          className={activeCycleColors}
          category={catchAllCategory}
        />
      )}
      <br />
      <CategoryTable
        categories={categories.filter((cat) => cat.type !== "CATCH_ALL")}
      />
    </>
  );
}
