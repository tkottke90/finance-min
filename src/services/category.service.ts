"use server";

import { CreateCategory } from "@/lib/models/category";
import { prisma } from "@/lib/prisma-client";

export async function create(category: CreateCategory) {
  return prisma.category.create({
    data: category,
  });
}

export async function getUserCategories(userId: string) {
  return prisma.category.findMany({
    where: { userId },
  });
}
