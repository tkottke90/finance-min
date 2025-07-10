import NextAuth, { AuthOptions } from "next-auth";
import AuthentikProvider from "next-auth/providers/authentik";

import { prisma } from "@/lib/prisma-client";
import { formatDuration } from "@/lib/utils/date-utils";

export const authOptions: AuthOptions = {
  providers: [
    AuthentikProvider({
      clientId: process.env.AUTHENTIK_ID!,
      clientSecret: process.env.AUTHENTIK_SECRET!,
      issuer: process.env.AUTHENTIK_ISSUER!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (profile?.sub) {
        // Check if the user exists in the database
        const user = await prisma.user.findFirst({
          where: {
            uuid: profile?.sub,
          },
        });

        if (!user) {
          // Create a new user if they don't exist
          await prisma.user.create({
            data: {
              uuid: profile?.sub,
              name: profile?.name,
              email: profile?.email,
            },
          });

          console.log(`User created (sub: ${profile?.sub})`);
        }
      }

      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.sub;
        token.createdAt = new Date().toISOString();
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (token.id && session.user) {
        session.user.id = token.id as string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).memberSince = new Date().toISOString() as string;
      }

      if (token.sub) {
        const user = await prisma.user.findFirst({
          where: {
            uuid: token.sub,
          },
        });

        if (user) {
          session.user.name = user.name;
          session.user.email = user.email;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (session.user as any).memberSince = user.createdAt.toISOString();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (session as any).remainingTime = formatDuration(
            new Date(session.expires).valueOf() - new Date().valueOf(),
          );
        }
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
