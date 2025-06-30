'use client';

import { DrawerConfig } from "@/components/containers/drawer-layout";
import { LayoutDashboard, LogOut, User, CalendarDays, Wallet2, CreditCard, Settings } from "lucide-react";
import { signOut } from "next-auth/react";

export const AppLinks: DrawerConfig = {
  links: [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/dashboard'
    },
    {
      icon: CalendarDays,
      label: 'Cycles',
      href: '/cycles'
    },
    {
      icon: CreditCard,
      label: 'Categories',
      href: '/categories'
    },
    {
      icon: Wallet2,
      label: 'Receipts',
      href: '/receipts'
    },
    {
      icon: Settings,
      label: 'Accounts',
      href: '/accounts'
    }
  ],
  userLinks: [
    {
      icon: User,
      label: 'Account',
      href: '/account'
    },
    {
      icon: LogOut,
      label: 'Logout',
      href: '',
      onClick: () => {
        signOut({
          callbackUrl: '/',
          redirect: true
        });
      }
    }
  ]
}