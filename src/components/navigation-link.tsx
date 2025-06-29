'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function isLinkActive(pathname: string, href: string, active?: boolean) {
  if (active) {
    return true;
  }

  if (!href) {
    return false;
  }

  return pathname.startsWith(href);
}

export function NavigationLink({ label, icon: Icon, href, active, onClick }: Readonly<{
  icon: LucideIcon;
  href: string;
  active?: boolean;
  label: string;
  onClick?: () => void;
}>) {
  const pathname = usePathname()

  const baseClasses = "block p-2 flex  justify-center md:justify-start items-center gap-2";
  const activeClasses = isLinkActive(pathname, href, active) ? "bg-illuminating-emerald-200 text-illuminating-emerald-800" : "hover:bg-zinc-300 dark:hover:bg-zinc-700";

  return (<Link className={`${baseClasses} ${activeClasses}`} href={href} onClick={onClick}>
    <Icon className="w-8 h-8 md:w-5 md:h-5" />
    <span className="hidden md:inline">{label}</span>
  </Link>);
}