'use client';

import { CustomComponentProps } from "@/lib/components";
import { LucideIcon } from "lucide-react";
import { NavigationLink } from "../navigation-link";

interface DrawerLinkConfig {
  icon: LucideIcon;
  label: string;
  href: string;
  onClick?: () => void;
}

export interface DrawerConfig {
  links?: DrawerLinkConfig[];
  userLinks?: DrawerLinkConfig[];
}

function createNavigationLink(link: DrawerLinkConfig, index: number) {
  return <NavigationLink key={`${index}-${link.label}`} icon={link.icon} label={link.label} href={link.href} onClick={link.onClick} />;
}

const drawerLayoutContentColors = [
  /* Light Mode */
  'bg-zinc-200',
  'text-zinc-800',
  'border-l-zinc-300',

  /* Dark Mode */
  'dark:bg-zinc-900',
  'dark:text-zinc-300',
  'dark:border-l-zinc-700'
].join(' ');

export default function DrawerLayout({ children, links }: CustomComponentProps<{ links?: DrawerConfig }>) {
  return (
    <div className="h-full w-full grid grid-cols-[64px_1fr] md:grid-cols-[200px_1fr]">
      <aside className="h-full flex flex-col gap-4 bg-illuminating-emerald-300 dark:bg-zinc-600 text-zinc-900 dark:text-white">
        <h3 className="text-center text-3xl md:text-4xl p-2 font-bold">FM</h3>
        <div className="flex-grow">
          {links?.links?.map(createNavigationLink)}
        </div>
        <div>
          {links?.userLinks?.map(createNavigationLink)}
        </div>
      </aside>
      <div className={`w-full h-full p-4 border-l-2 ${drawerLayoutContentColors} shadow-lg shadow-zinc-900`}>{children}</div>
    </div>
  );
}
