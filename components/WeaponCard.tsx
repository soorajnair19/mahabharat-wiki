"use client";

import { Card } from "./Card";
import { WeaponStatIcon } from "./AttributeIcons";
import type { Weapon } from "@/lib/types";
import { cn, getRarityThemeClasses } from "@/lib/utils";
import { Sparkles, Sword } from "lucide-react";

interface WeaponCardProps {
  weapon: Weapon;
  onClick?: () => void;
}

export function WeaponCard({ weapon, onClick }: WeaponCardProps) {
  const theme = getRarityThemeClasses(weapon.rarity);
  const WeaponTypeIcon = weapon.type === "Astra" ? Sparkles : Sword;

  return (
    <Card rarity={weapon.rarity} onClick={onClick}>
      <div className="flex h-full min-h-[420px] flex-col">
        {/* Top strip */}
        <div
          className={cn(
            "flex items-center justify-between gap-3 border-b px-3 py-2 text-xs",
            theme.stripBg,
            theme.stripBorder
          )}
        >
          <span
            className={cn(
              "truncate text-left font-display text-sm font-semibold",
              theme.titleText
            )}
          >
            {weapon.name}
          </span>
          <div className="ml-auto flex items-center gap-3">
            <WeaponTypeIcon className={cn("h-4 w-4 shrink-0", theme.accentText)} title={weapon.type} />
            <span className={cn("text-right font-semibold", theme.accentText)}>
              {weapon.power_level}
            </span>
          </div>
        </div>

        {/* Main image placeholder area */}
        <div
          className={cn(
            "flex flex-1 items-center justify-center border-b text-xs uppercase tracking-wide",
            theme.stripBorder,
            theme.placeholderBg,
            theme.placeholderText
          )}
        >
          Image Placeholder
        </div>

        {/* Bottom stats block: first row 3 stats, second row rarity */}
        <div className="grid grid-cols-3 justify-items-center gap-1 p-2">
          <WeaponStatIcon type="type" value={weapon.type} size="sm" valueOnly />
          <WeaponStatIcon type="element" value={weapon.element} size="sm" valueOnly />
          <WeaponStatIcon type="power" value={`${weapon.power_level}/10`} size="sm" valueOnly />
          <div className="col-span-3">
            <WeaponStatIcon type="rarity" value={weapon.rarity} size="sm" valueOnly />
          </div>
        </div>
      </div>
    </Card>
  );
}
