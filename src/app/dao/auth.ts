import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/v1/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export async function checkAuth() {
  const session = await getServerSession(authOptions);

  if (!session || session.expires) {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });

    throw Error("Access Required");
  }

  return session;
}
