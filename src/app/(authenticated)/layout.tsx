import DrawerLayout from "@/components/containers/drawer-layout";
import { AppLinks } from "./app-links";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DrawerLayout className="min-h-screen bg-gray-50 py-8" links={AppLinks}>
      {children}
    </DrawerLayout>
  );
}
