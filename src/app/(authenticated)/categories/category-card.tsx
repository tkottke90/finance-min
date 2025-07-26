"use-client";

import { CustomComponentProps } from "@/lib/components";
import { Category } from "@/lib/models/category";

export function CategoryCard({
  category,
  className,
}: CustomComponentProps<{ category: Category }>) {
  return (
    <div className={`card ${className}`}>
      <h2 className="font-bold">{category.name}</h2>
    </div>
  );
}
