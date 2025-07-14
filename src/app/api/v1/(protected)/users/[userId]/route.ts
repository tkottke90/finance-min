import { UserSchema } from "@/lib/models/user";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma-client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;
  const { data, success } = UserSchema.shape.uuid.safeParse(userId);

  if (!success) {
    return Response.json(
      { message: "Invalid User" },
      { status: 400, statusText: "Invalid Input" },
    );
  }

  const user = await prisma.user.findUnique({
    where: { uuid: userId },
  });

  if (!user) {
    return Response.json(
      { message: "Invalid User" },
      { status: 404, statusText: "Invalid Input" },
    );
  }

  return Response.json(user);
}
