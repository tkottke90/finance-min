import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/v1/auth/[...nextauth]/route";

export default async function requireAdmin(request: NextRequest) {
  const session = await getServerSession(req, null, authOptions);
}
