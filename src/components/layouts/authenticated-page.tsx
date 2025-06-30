import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/v1/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DrawerLayout from "@/components/containers/drawer";
import { AppLinks } from "@/app/(authenticated)/app-links";

interface AuthenticatedPageProps {
  children: React.ReactNode;
}

export default async function AuthenticatedPage({ children }: AuthenticatedPageProps) {
  // Get the current session on the server
  const session = await getServerSession(authOptions);
  
  // Redirect to login if not authenticated
  if (!session || !session.user) {
    redirect('/login');
  }

  return (
    <DrawerLayout className="min-h-screen bg-gray-50 py-8" links={AppLinks}>
      {children}
    </DrawerLayout>
  );
}

// Higher-order function to wrap pages
export function withAuthenticatedLayout<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function AuthenticatedPageWrapper(props: T) {
    return (
      <AuthenticatedPage>
        <WrappedComponent {...props} />
      </AuthenticatedPage>
    );
  };
}
