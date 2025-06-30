import { prisma } from "@/lib/prisma-client";

export async function getUserByUUID(uuid: string) {
  return await prisma.user.findUnique({
    where: {
      uuid,
    },
  });
}

/* Hooks */

export async function useUser(uuid: string) {
  return await getUserByUUID(uuid);
}