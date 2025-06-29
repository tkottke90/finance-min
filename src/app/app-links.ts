'use client';

import { DrawerConfig } from "@/components/layouts/drawer";
import { LayoutDashboard, LogOut, User, CalendarDays, Wallet2, CreditCard, Settings } from "lucide-react";

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
      icon: Wallet2,
      label: 'Receipts',
      href: '/receipts'
    },
    {
      icon: CreditCard,
      label: 'Categories',
      href: '/categories'
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
      href: '/logout'
    }
  ]
}