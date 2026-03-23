"use client";

import { useEffect, useRef, useState } from "react";
import {
  Swords,
  ChessKnight,
  Handshake,
  WandSparkles,
  Crown,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

export type FilterType = "characters" | "weapons";

interface FilterOption {
  value: string;
  label: string;
}

interface FiltersProps {
  type: FilterType;
  sideFilter?: string;
  onSideChange?: (value: string) => void;
  sortFilter?: string;
  onSortChange?: (value: string) => void;
  rarityFilter: string;
  onRarityChange: (value: string) => void;
  secondaryFilter: string;
  onSecondaryChange: (value: string) => void;
}

interface CustomSelectOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

const SIDE_OPTIONS: FilterOption[] = [
  { value: "", label: "All Sides" },
  { value: "Pandava", label: "Pandava" },
  { value: "Kaurava", label: "Kaurava" },
  { value: "Neutral", label: "Neutral" },
];

const RARITY_OPTIONS: FilterOption[] = [
  { value: "", label: "All Rarities" },
  { value: "common", label: "Common" },
  { value: "rare", label: "Rare" },
  { value: "epic", label: "Epic" },
  { value: "legendary", label: "Legendary" },
];

const ARCHETYPE_OPTIONS: FilterOption[] = [
  { value: "", label: "All Archetypes" },
  { value: "Warrior", label: "Warrior" },
  { value: "Strategist", label: "Strategist" },
  { value: "Support", label: "Support" },
  { value: "Sage", label: "Sage" },
  { value: "Leader", label: "Leader" },
];

const ARCHETYPE_ICON_MAP: Record<string, LucideIcon> = {
  Warrior: Swords,
  Strategist: ChessKnight,
  Support: Handshake,
  Sage: WandSparkles,
  Leader: Crown,
};

const WEAPON_TYPE_OPTIONS: FilterOption[] = [
  { value: "", label: "All Types" },
  { value: "Astra", label: "Astra" },
  { value: "Shastra", label: "Shastra" },
];

const SORT_OPTIONS: FilterOption[] = [
  { value: "", label: "Default" },
  { value: "power_desc", label: "Power Index (High to Low)" },
];

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  minWidthClass?: string;
}

function CustomSelect({
  label,
  value,
  onChange,
  options,
  minWidthClass = "min-w-[180px]",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value) ?? options[0];

  return (
    <div>
      <label className="mb-1 block text-sm text-stone-500">{label}</label>
      <div className={`relative ${minWidthClass}`} ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex w-full items-center justify-between rounded border px-3 py-2 text-stone-200 focus:outline-none ${
            isOpen
              ? "border-stone-500 bg-stone-800"
              : "border-stone-600/50 bg-stone-800/80 focus:border-stone-500"
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="inline-flex items-center gap-2">
            {selected.icon ? <selected.icon className="h-4 w-4 text-stone-400" /> : null}
            <span>{selected.label}</span>
          </span>
          <ChevronDown className="h-4 w-4 text-stone-400" />
        </button>
        {isOpen && (
          <div
            className="absolute z-30 mt-1 w-full rounded border border-stone-600/70 bg-stone-900 p-1 shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
            role="listbox"
          >
            {options.map((opt) => {
              const isActive = value === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm ${
                    isActive
                      ? "bg-stone-700/60 text-stone-100"
                      : "text-stone-300 hover:bg-stone-800/80"
                  }`}
                  role="option"
                  aria-selected={isActive}
                >
                  {opt.icon ? <opt.icon className="h-4 w-4 text-stone-400" /> : null}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function Filters({
  type,
  sideFilter = "",
  onSideChange,
  sortFilter = "",
  onSortChange,
  rarityFilter,
  onRarityChange,
  secondaryFilter,
  onSecondaryChange,
}: FiltersProps) {
  const secondaryOptions = (
    type === "characters" ? ARCHETYPE_OPTIONS : WEAPON_TYPE_OPTIONS
  ).map((opt) => ({
    ...opt,
    icon: type === "characters" ? ARCHETYPE_ICON_MAP[opt.value] : undefined,
  }));
  const secondaryLabel = type === "characters" ? "Archetype" : "Weapon Type";

  return (
    <div className="flex flex-wrap gap-4">
      {type === "characters" && onSideChange && (
        <CustomSelect
          label="Side"
          value={sideFilter}
          onChange={onSideChange}
          options={SIDE_OPTIONS}
          minWidthClass="min-w-[205px]"
        />
      )}
      {type === "characters" && onSortChange && (
        <CustomSelect
          label="Sort by"
          value={sortFilter}
          onChange={onSortChange}
          options={SORT_OPTIONS}
          minWidthClass="min-w-[320px]"
        />
      )}
      <CustomSelect
        label="Rarity"
        value={rarityFilter}
        onChange={onRarityChange}
        options={RARITY_OPTIONS}
        minWidthClass="min-w-[205px]"
      />
      <CustomSelect
        label={secondaryLabel}
        value={secondaryFilter}
        onChange={onSecondaryChange}
        options={secondaryOptions}
      />
    </div>
  );
}
