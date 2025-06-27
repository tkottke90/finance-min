import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.scss";
import AuthGuard from "@/components/guards/auth-guard";

const fontRoboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance Minimum",
  description: "Minimalistic finance app"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontRoboto.variable} antialiased`}
      >
        <AuthGuard>
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}
