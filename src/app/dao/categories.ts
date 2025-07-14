import { prisma } from "@/lib/prisma-client";
import { checkAuth } from "./auth";

export async function getCategories() {
  const userSession = await checkAuth();

  return prisma.category.findMany({
    where: { userId: userSession.user.id },
  });
}
