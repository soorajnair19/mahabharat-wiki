"use client";

import {
  Swords,
  Target,
  Brain,
  Map,
  Scale,
  Sparkles,
  Sword,
  FlaskConical,
  Zap,
  Star,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CHARACTER_ATTR_ICONS: Record<string, LucideIcon> = {
  strength: Swords,
  skill: Target,
  intelligence: Brain,
  strategy: Map,
  morality: Scale,
};

const WEAPON_TYPE_ICONS: Record<string, LucideIcon> = {
  Astra: Sparkles,
  Shastra: Sword,
};

interface CharacterAttributeProps {
  name: string;
  value: number | string;
}

const ATTR_SHORT_LABELS: Record<string, string> = {
  strength: "Str",
  skill: "Skl",
  intelligence: "Int",
  strategy: "Stg",
  morality: "Mor",
};

interface CharacterAttributeIconProps extends CharacterAttributeProps {
  size?: "sm" | "md";
  iconOnly?: boolean;
  valueOnly?: boolean;
}

export function CharacterAttributeIcon({
  name,
  value,
  size = "md",
  iconOnly = false,
  valueOnly = false,
}: CharacterAttributeIconProps) {
  const Icon = CHARACTER_ATTR_ICONS[name] ?? Zap;
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  const shortLabel = ATTR_SHORT_LABELS[name] ?? name.slice(0, 3);

  const isSm = size === "sm";

  if (iconOnly) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded border border-stone-600/50 bg-stone-700/30 text-stone-300",
          isSm ? "h-7 w-7" : "h-8 w-8"
        )}
        title={`${label}: ${value}`}
      >
        <Icon className={`shrink-0 text-stone-300 ${isSm ? "h-3.5 w-3.5" : "h-4 w-4"}`} />
      </span>
    );
  }

  if (valueOnly) {
    return (
      <span
        className={`inline-flex items-center rounded border border-stone-600/50 bg-stone-700/30 text-stone-300 ${
          isSm
            ? "gap-1 px-1.5 py-0.5 text-xs leading-tight"
            : "gap-1.5 px-2 py-1 text-sm"
        }`}
        title={`${label}: ${value}`}
      >
        <Icon
          className={`shrink-0 text-stone-400 ${isSm ? "h-3 w-3" : "h-3.5 w-3.5"}`}
        />
        <span className={isSm ? "font-mono tabular-nums" : ""}>{value}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded border border-stone-600/50 bg-stone-700/30 text-stone-300 ${
        isSm
          ? "gap-1 px-1.5 py-0.5 text-xs leading-tight"
          : "gap-1.5 px-2 py-1 text-sm"
      }`}
      title={label}
    >
      <Icon
        className={`shrink-0 text-stone-400 ${isSm ? "h-3 w-3" : "h-3.5 w-3.5"}`}
      />
      <span className={isSm ? "font-mono tabular-nums" : ""}>
        {isSm ? `${shortLabel}:${value}` : `${label}: ${value}`}
      </span>
    </span>
  );
}

interface WeaponStatProps {
  type: "type" | "element" | "power" | "rarity";
  value: string | number;
  size?: "sm" | "md";
  valueOnly?: boolean;
}

export function WeaponStatIcon({
  type,
  value,
  size = "md",
  valueOnly = false,
}: WeaponStatProps) {
  let Icon: LucideIcon = Zap;
  let label = "";

  if (type === "type") {
    Icon = WEAPON_TYPE_ICONS[String(value)] ?? Sword;
    label = String(value);
  } else if (type === "element") {
    Icon = FlaskConical;
    label = String(value);
  } else if (type === "power") {
    Icon = Zap;
    label = `Power: ${value}`;
  } else if (type === "rarity") {
    Icon = Star;
    label = String(value);
  }

  const isSm = size === "sm";

  const displayLabels: Record<string, string> = {
    type: "Type",
    element: "Element",
    power: "Power",
    rarity: "Rarity",
  };
  const shortLabels: Record<string, string> = {
    type: "Type",
    element: "Elem",
    power: "Pwr",
    rarity: "Rarity",
  };
  const displayText = isSm
    ? `${shortLabels[type]}: ${value}`
    : `${displayLabels[type]}: ${value}`;

  if (valueOnly) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded border border-stone-600/50 bg-stone-700/30 text-stone-300 capitalize ${
          isSm ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-sm"
        }`}
        title={label}
      >
        <Icon
          className={`shrink-0 text-stone-400 ${isSm ? "h-3 w-3" : "h-3.5 w-3.5"}`}
        />
        <span className={isSm ? "font-mono tabular-nums" : ""}>{value}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border border-stone-600/50 bg-stone-700/30 text-stone-300 capitalize ${
        isSm ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-sm"
      }`}
      title={label}
    >
      <Icon
        className={`shrink-0 text-stone-400 ${isSm ? "h-3 w-3" : "h-3.5 w-3.5"}`}
      />
      <span>{displayText}</span>
    </span>
  );
}
