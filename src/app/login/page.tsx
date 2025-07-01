'use client';

import { useRouter } from 'next/navigation';
import SingleActionLayout from "@/components/containers/single-action";
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { Suspense, useEffect } from 'react';
import { LoginError } from './login-error';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  const handleAuthentikLogin = async () => {
    try {
      await signIn('authentik', {
        callbackUrl: '/dashboard',
        redirect: true
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <SingleActionLayout>
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-6">Loading...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-illuminating-emerald-500 mx-auto"></div>
        </div>
      </SingleActionLayout>
    );
  }

  return (
    <SingleActionLayout>
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <Suspense>
          <LoginError />
        </Suspense>

        <div className="space-y-4">
          {/* Authentik Login Button */}
          <button
            onClick={handleAuthentikLogin}
            className="w-full rounded-full border bg-illuminating-emerald-500 text-white font-bold py-3 px-6 hover:bg-illuminating-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Login with Authentik
          </button>
        </div>

        {/* Session display (for development) */}
        {process.env.NODE_ENV === 'development' && session && (
          <details className="mt-6 text-xs text-gray-600">
            <summary className="cursor-pointer">Session Information</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </details>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </SingleActionLayout>
  );
}
