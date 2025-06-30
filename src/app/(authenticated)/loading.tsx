import DrawerLayout from "@/components/containers/drawer";
import { AppLinks } from "./app-links";

export default function Loading() {
  return (
    <DrawerLayout className="min-h-screen bg-gray-50 py-8" links={AppLinks}>
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-illuminating-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    </DrawerLayout>
  );
}
