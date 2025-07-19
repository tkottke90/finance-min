"use server";

import { prisma } from "@/lib/prisma-client";
import { checkAuth } from "./auth";
import { FormState } from "@/interfaces/form.interface";
import { CreateCategory, CreateCategorySchema } from "@/lib/models/category";

export async function getCategories() {
  const userSession = await checkAuth();

  const categories = await prisma.category.findMany({
    where: { userId: userSession.user.id },
  });

  return categories.map((category) => ({
    ...category,
    balance: category.balance.toPrecision(2),
  }));
}

export async function createCategoryAction(
  prevState: FormState<CreateCategory> | undefined,
  formData: FormData,
): Promise<FormState<CreateCategory>> {
  const name = (formData.get("name") as string) ?? "";
  const description = (formData.get("description") as string) ?? "";
  const type = (formData.get("type") as string) ?? "";
  const color = (formData.get("color") as string) ?? undefined;
  const overflowCategoryId = formData.get("overflowCategoryId");
  const balance = parseFloat((formData.get("balance") as string) ?? "0");

  // Convert overflowCategoryId to number if it exists and is not empty
  const parsedOverflowCategoryId =
    overflowCategoryId && overflowCategoryId !== ""
      ? parseInt(overflowCategoryId as string, 10)
      : undefined;

  const formState: CreateCategory = {
    name,
    description,
    type: type as any,
    color: color || undefined,
    overflowCategoryId: parsedOverflowCategoryId,
    balance,
    userId: "", // Will be set from session
  };

  // Validate form data using Zod schema
  const {
    data: parsedValue,
    success,
    error,
  } = CreateCategorySchema.safeParse(formState);

  if (!success) {
    const message =
      error.issues.length > 1
        ? `Multiple Validation Issues - ${error.issues.map((issue) => issue.message).join(", ")}`
        : error.issues[0].message;

    return {
      isSuccess: false,
      message,
      formState: prevState?.formState || formState,
    };
  }

  try {
    // Get user session for userId
    const userSession = await checkAuth();

    // Set userId from session
    parsedValue.userId = userSession.user.id;

    // Create the category
    const newCategory = await prisma.category.create({
      data: parsedValue,
    });

    return {
      isSuccess: true,
      message: "Category created successfully",
      formState: {
        name: "",
        description: "",
        type: "" as any,
        color: undefined,
        overflowCategoryId: undefined,
        balance: 0,
        userId: userSession.user.id,
      },
    };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      isSuccess: false,
      message: "Failed to create category",
      formState: prevState?.formState || formState,
    };
  }
}
