import { getServerSession } from "next-auth";
import { authOptions } from "../../api/v1/auth/[...nextauth]/route";
import { getUserByUUID } from "@/services/user.service";
import { redirect } from "next/navigation";
import AccountForm from "./account-form";
import { signOut } from "next-auth/react";

export default async function AccountPage() {
  // Get the current session on the server
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch user data from database
  const user = await getUserByUUID(session.user.id);

  // If user not found in database, redirect to login
  if (!user) {
    signOut({
      callbackUrl: "/",
      redirect: true,
    });

    return null;
  }

  // Serialize the user data for the client component
  const serializedUser = {
    id: user.id,
    uuid: user.uuid,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };

  return <AccountForm initialUser={serializedUser} />;
}
