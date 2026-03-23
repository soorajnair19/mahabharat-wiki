"use client";

import { motion } from "framer-motion";
import { cn, getRarityClass, getRarityThemeClasses } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  rarity?: string;
  onClick?: () => void;
}

export function Card({ children, className, rarity = "common", onClick }: CardProps) {
  const theme = getRarityThemeClasses(rarity);

  return (
    <motion.div
      className={cn(
        "hover-3d cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="hover-3d-zone zone-1" aria-hidden="true" />
      <div className="hover-3d-zone zone-2" aria-hidden="true" />
      <div className="hover-3d-zone zone-3" aria-hidden="true" />
      <div className="hover-3d-zone zone-4" aria-hidden="true" />
      <div className="hover-3d-zone zone-5" aria-hidden="true" />
      <div className="hover-3d-zone zone-6" aria-hidden="true" />
      <div className="hover-3d-zone zone-7" aria-hidden="true" />
      <div className="hover-3d-zone zone-8" aria-hidden="true" />
      <div
        className={cn(
          "hover-3d-card overflow-hidden rounded-sm",
          theme.cardBg,
          getRarityClass(rarity),
          "shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
