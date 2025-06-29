'use client';

import DrawerLayout from "@/components/layouts/drawer";
import { AppLinks } from "../app-links";

export default function AccountPage() {
  return (
    <DrawerLayout className="min-h-screen bg-gray-50 py-8" links={AppLinks}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Account</h1>
        </div>
      </div>
    </DrawerLayout>
  );
}
