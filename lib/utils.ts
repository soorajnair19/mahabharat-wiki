import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRarityClass(rarity: string): string {
  switch (rarity) {
    case "common":
      return "rarity-common";
    case "rare":
      return "rarity-rare";
    case "epic":
      return "rarity-epic";
    case "legendary":
      return "rarity-legendary";
    default:
      return "rarity-common";
  }
}

export function getRarityThemeClasses(rarity: string): {
  cardBg: string;
  stripBg: string;
  stripBorder: string;
  titleText: string;
  accentText: string;
  placeholderBg: string;
  placeholderBorder: string;
  placeholderText: string;
} {
  switch (rarity) {
    case "rare":
      return {
        cardBg: "bg-gradient-to-b from-blue-500/85 via-blue-700/80 to-blue-900/90",
        stripBg: "bg-blue-900/80",
        stripBorder: "border-blue-700/45",
        titleText: "text-blue-100",
        accentText: "text-blue-300",
        placeholderBg: "bg-blue-950/55",
        placeholderBorder: "border-blue-600/40",
        placeholderText: "text-blue-200/80",
      };
    case "epic":
      return {
        cardBg: "bg-gradient-to-b from-purple-500/85 via-purple-700/80 to-purple-900/90",
        stripBg: "bg-purple-900/80",
        stripBorder: "border-purple-700/45",
        titleText: "text-purple-100",
        accentText: "text-purple-300",
        placeholderBg: "bg-purple-950/55",
        placeholderBorder: "border-purple-600/40",
        placeholderText: "text-purple-200/80",
      };
    case "legendary":
      return {
        cardBg: "bg-gradient-to-b from-amber-300/85 via-amber-600/80 to-amber-900/90",
        stripBg: "bg-amber-900/80",
        stripBorder: "border-amber-700/45",
        titleText: "text-amber-100",
        accentText: "text-amber-300",
        placeholderBg: "bg-amber-950/55",
        placeholderBorder: "border-amber-600/40",
        placeholderText: "text-amber-200/85",
      };
    case "common":
    default:
      return {
        cardBg: "bg-stone-800/90",
        stripBg: "bg-stone-900/80",
        stripBorder: "border-stone-600/50",
        titleText: "text-stone-200",
        accentText: "text-stone-400",
        placeholderBg: "bg-stone-700/20",
        placeholderBorder: "border-stone-500/50",
        placeholderText: "text-stone-500",
      };
  }
}
