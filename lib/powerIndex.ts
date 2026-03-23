import type { Archetype, Character } from "./types";

type WeightMap = Record<string, number>;

const WEIGHTS: Record<Archetype, WeightMap> = {
  Warrior: {
    strength: 0.35,
    skill: 0.35,
    strategy: 0.2,
    intelligence: 0.1,
  },
  Strategist: {
    strategy: 0.4,
    intelligence: 0.4,
    skill: 0.1,
    strength: 0.1,
  },
  Sage: {
    intelligence: 0.4,
    strategy: 0.4,
    skill: 0.1,
    strength: 0.1,
  },
  Leader: {
    strategy: 0.35,
    morality: 0.25,
    intelligence: 0.2,
    strength: 0.1,
    skill: 0.1,
  },
  Support: {
    morality: 0.35,
    intelligence: 0.3,
    strategy: 0.2,
    skill: 0.1,
    strength: 0.05,
  },
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function calculatePowerIndex(character: Character): number {
  const weights = WEIGHTS[character.archetype];
  let score = 0;

  for (const key of Object.keys(weights)) {
    score += character.attributes[key as keyof typeof character.attributes] * weights[key];
  }

  if (character.divine) {
    score *= 1.1;
  }

  return clamp(Math.round(score), 0, 100);
}

export function getPowerIndexTier(index: number): "legendary" | "epic" | "rare" | "neutral" {
  if (index >= 90) return "legendary";
  if (index >= 80) return "epic";
  if (index >= 70) return "rare";
  return "neutral";
}
