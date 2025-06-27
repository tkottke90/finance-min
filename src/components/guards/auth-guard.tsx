'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthGuard({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <SessionProvider basePath="/api/v1/auth">
      {children}
    </SessionProvider>
  );
}
