"use client";

import { Card } from "./Card";
import { CharacterAttributeIcon } from "./AttributeIcons";
import type { Character } from "@/lib/types";
import { calculatePowerIndex } from "@/lib/powerIndex";
import { cn, getRarityThemeClasses } from "@/lib/utils";
import {
  Swords,
  ChessKnight,
  Handshake,
  WandSparkles,
  Crown,
  type LucideIcon,
} from "lucide-react";

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  const powerIndex = calculatePowerIndex(character);
  const theme = getRarityThemeClasses(character.rarity);
  const orderedStats: Array<keyof Character["attributes"]> = [
    "strength",
    "skill",
    "intelligence",
    "strategy",
    "morality",
  ];
  const archetypeIcons: Record<Character["archetype"], LucideIcon> = {
    Warrior: Swords,
    Strategist: ChessKnight,
    Support: Handshake,
    Sage: WandSparkles,
    Leader: Crown,
  };
  const ArchetypeIcon = archetypeIcons[character.archetype] ?? Swords;

  return (
    <Card rarity={character.rarity} onClick={onClick}>
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
            {character.name}
          </span>
          <div className="ml-auto flex items-center gap-3">
            <ArchetypeIcon
              className={cn("h-4 w-4 shrink-0", theme.accentText)}
              title={character.archetype}
            />
            <span className={cn("text-right font-semibold", theme.accentText)}>
              {powerIndex}
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

        {/* Bottom attributes row: icon + score on cards */}
        <div className="grid grid-cols-5 justify-items-center gap-1 p-2">
          {orderedStats.map((key) => (
            <CharacterAttributeIcon
              key={key}
              name={key}
              value={character.attributes[key]}
              size="sm"
              valueOnly
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
