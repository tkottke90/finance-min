"use client";

import { DrawerConfig } from "@/components/containers/drawer-layout";
import {
  LayoutDashboard,
  LogOut,
  User,
  CalendarDays,
  Wallet2,
  CreditCard,
  Settings,
  Shapes,
} from "lucide-react";
import { signOut } from "next-auth/react";

export const AppLinks: DrawerConfig = {
  links: [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: CalendarDays,
      label: "Cycles",
      href: "/cycles",
    },
    {
      icon: Shapes,
      label: "Categories",
      href: "/categories",
    },
    {
      icon: Wallet2,
      label: "Receipts",
      href: "/receipts",
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      href: "/payment-methods",
    },
  ],
  userLinks: [
    {
      icon: User,
      label: "Account",
      href: "/account",
    },
    {
      icon: LogOut,
      label: "Logout",
      href: "",
      onClick: () => {
        signOut({
          callbackUrl: "/",
          redirect: true,
        });
      },
    },
  ],
};
