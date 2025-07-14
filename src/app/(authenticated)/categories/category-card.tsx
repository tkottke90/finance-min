"use-client";

import { CustomComponentProps } from "@/lib/components";
import { Category } from "@/lib/models/category";

export function CategoryCard({
  category,
}: CustomComponentProps<{ category: Category }>) {
  return (
    <div className="card">
      <h2>{category.name}</h2>
    </div>
  );
}
