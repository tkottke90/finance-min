'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavigationLink({ label, icon: Icon, href, active }: Readonly<{
  icon: LucideIcon;
  href: string;
  active?: boolean;
  label: string;
}>) {
  const pathname = usePathname()

  const baseClasses = "block p-2 flex  justify-center md:justify-start items-center gap-2";
  const activeClasses = pathname.startsWith(href) || active ? "bg-illuminating-emerald-100 text-illuminating-emerald-800" : "hover:bg-gray-200";

  return (<Link className={`${baseClasses} ${activeClasses}`} href={href}>
    <Icon className="w-8 h-8 md:w-5 md:h-5" />
    <span className="hidden md:inline">{label}</span>
  </Link>);
}