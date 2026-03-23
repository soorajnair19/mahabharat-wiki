"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/characters", label: "Characters" },
  { href: "/weapons", label: "Weapons" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex gap-8">
      {links.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "transition",
              isActive
                ? "font-medium text-amber-400"
                : "text-stone-400 hover:text-stone-200"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
