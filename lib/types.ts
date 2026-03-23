export type CharacterSide = "Pandava" | "Kaurava" | "Neutral";
export type Archetype =
  | "Warrior"
  | "Strategist"
  | "Support"
  | "Sage"
  | "Leader";
export type Rarity = "common" | "rare" | "epic" | "legendary";
export type RelationType = "ally" | "enemy" | "mentor" | "family";

export type WeaponType = "Astra" | "Shastra";
export type WeaponElement =
  | "Fire"
  | "Water"
  | "Wind"
  | "Divine"
  | "Physical";

export interface CharacterAttributes {
  strength: number;
  skill: number;
  intelligence: number;
  strategy: number;
  morality: number;
}

export interface CharacterRelationship {
  name: string;
  relation: RelationType;
}

export interface Character {
  id: string;
  name: string;
  aliases: string[];
  side: CharacterSide;
  archetype: Archetype;
  description_short: string;
  description_long: string;
  attributes: CharacterAttributes;
  weapons: string[];
  defenses: string[];
  special_abilities: string[];
  notable_events: string[];
  relationships: CharacterRelationship[];
  tags: string[];
  rarity: Rarity;
  aura: string;
  divine?: boolean;
}

export interface Weapon {
  id: string;
  name: string;
  type: WeaponType;
  element: WeaponElement;
  description: string;
  power_level: number;
  rarity: Rarity;
  used_by: string[];
  special_effects: string[];
  limitations: string[];
  invocation: string;
  counter_weapons: string[];
  tags: string[];
}
