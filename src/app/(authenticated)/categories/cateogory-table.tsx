"use client";

import { CustomComponentProps } from "@/lib/components";
import { Category } from "@/lib/models/category";

export function CategoryTable({
  categories,
}: CustomComponentProps<{ categories: Category[] }>) {
  return (
    <ul>
      {categories.map((cat) => (
        <li>
          {cat.name} - {cat.type}
        </li>
      ))}
    </ul>
  );
}
