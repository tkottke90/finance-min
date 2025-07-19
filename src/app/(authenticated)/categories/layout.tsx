"use client";
import { useState } from "react";
import { AddCategory } from "./add-category";
import { Category } from "@/lib/models/category";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      <header className="flex justify-between">
        <h2 className="text-3xl font-bold">Categories</h2>
        <AddCategory />
      </header>
      <br />
      <main className="max-w-[600px] m-auto">{children}</main>
    </div>
  );
}
