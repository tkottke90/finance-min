import { CustomComponentProps } from "@/lib/components";
import { LucideIcon } from "lucide-react";
import { NavigationLink } from "../navigation-link";

interface DrawerLinkConfig {
  icon: LucideIcon;
  label: string;
  href: string;
}

export interface DrawerConfig {
  links?: DrawerLinkConfig[];
  userLinks?: DrawerLinkConfig[];
}

export default function DrawerLayout({ children, links }: CustomComponentProps<{ links?: DrawerConfig }>) {
  return (
    <div className="h-full w-full grid grid-cols-[64px_1fr] md:grid-cols-[200px_1fr]">
      <aside className="h-full flex flex-col gap-4 bg-zinc-200 dark:bg-zinc-600 text-zinc-900 dark:text-white">
        <h3 className="text-center bold text-2xl p-2">FM</h3>
        <div className="flex-grow">
          {links?.links?.map((link, index) => (
            <NavigationLink key={index} icon={link.icon} label={link.label} href={link.href} />
          ))}
        </div>
        <div>
          {links?.userLinks?.map((link, index) => (
            <NavigationLink key={index} icon={link.icon} label={link.label} href={link.href} />
          ))}
        </div>
      </aside>
      <div className="w-full h-full p-4 bg-zinc-100 dark:bg-zinc-900 shadow-2xl">{children}</div>
    </div>
  );
}
