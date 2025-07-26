"use client";

import { CustomComponentProps } from "@/lib/components";
// import { Category } from "@/lib/models/category";
import { CategoryType, Category } from "@/lib/prisma";

export function createClassNameForColor(color: string) {
  return `bg-${color}-200 text-black dark:bg-${color}-600 border dark:text-white`;
}

export function CategoryTable({
  categories,
}: CustomComponentProps<{ categories: Category[] }>) {
  return (
    <>
      <CategoryGroup
        categories={categories}
        type="FIXED"
        className="bg-orange-100 border-orange-300 text-black dark:bg-orange-600 dark:border-orange-500 border dark:text-white"
      />
      <br />
      <CategoryGroup
        categories={categories}
        type="VARIABLE"
        className="bg-sky-100 border-sky-300 text-black dark:bg-sky-600 dark:border-sky-500 border dark:text-white"
      />
      <br />
      <CategoryGroup
        categories={categories}
        type="GOAL"
        className="bg-indigo-200 border-indigo-400 text-black dark:bg-indigo-600 dark:border-indigo-500 border dark:text-white"
      />
    </>
  );
}

export function CategoryGroup({
  type,
  className,
  categories,
}: CustomComponentProps<{ type: CategoryType; categories: Category[] }>) {
  return (
    <div className="rounded overflow-hidden pb-1">
      <header>
        <h4 className={`my-container font-bold rounded-t ${className}`}>
          {type[0]}
          {type.slice(1).toLocaleLowerCase()}
        </h4>
      </header>
      <ul>
        {categories
          .filter((cat) => cat.type === type)
          .map((cat, index) => (
            <li className="flex justify-between" key={`cat-${cat.id}-${index}`}>
              <span>{cat.name}</span>
              <span>{Number(cat.balance).toFixed(2)}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
