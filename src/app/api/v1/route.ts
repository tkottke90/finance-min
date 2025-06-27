import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    version: 'v1',
    description: 'Finance Minimum API v1',
    authentication: 'NextAuth.js with Authentik provider',
    endpoints: {
      auth: {
        nextauth: {
          path: '/api/v1/auth/nextauth',
          methods: ['GET', 'POST'],
          description: 'NextAuth.js authentication endpoints (signin, callback, signout, session, etc.)',
          provider: 'Authentik',
          note: 'Handles all OAuth2 flow automatically'
        }
      }
    },
    clientUsage: {
      session: 'useSession() hook from next-auth/react',
      signIn: 'signIn("authentik") function',
      signOut: 'signOut() function'
    },
    timestamp: new Date().toISOString()
  });
}
