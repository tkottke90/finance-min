'use client';

import DrawerLayout from '@/components/containers/drawer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AppLinks } from '../app-links';

export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-illuminating-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <DrawerLayout className="min-h-screen bg-gray-50 py-8" links={AppLinks}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Welcome!</h2>
            <p className="text-gray-600">
              You have successfully authenticated using OAuth2.
            </p>
          </div>
        </div>
      </div>
    </DrawerLayout>
  );
}
