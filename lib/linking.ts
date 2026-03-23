import type { Character, Weapon } from "./types";

/**
 * Validates bidirectional linking between characters and weapons.
 * Ensures characters.weapons references exist in weapons and
 * weapons.used_by references exist in characters.
 */
export function validateLinks(
  characters: Character[],
  weapons: Weapon[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const characterIds = new Set(characters.map((c) => c.id));
  const weaponIds = new Set(weapons.map((w) => w.id));

  for (const char of characters) {
    for (const weaponId of char.weapons) {
      if (!weaponIds.has(weaponId)) {
        errors.push(
          `Character "${char.name}" references unknown weapon "${weaponId}"`
        );
      }
    }
  }

  for (const weapon of weapons) {
    for (const charId of weapon.used_by) {
      if (!characterIds.has(charId)) {
        errors.push(
          `Weapon "${weapon.name}" references unknown character "${charId}"`
        );
      }
    }
  }

  for (const char of characters) {
    for (const weaponId of char.weapons) {
      const weapon = weapons.find((w) => w.id === weaponId);
      if (weapon && !weapon.used_by.includes(char.id)) {
        errors.push(
          `Character "${char.name}" lists weapon "${weaponId}" but weapon does not list character`
        );
      }
    }
  }

  for (const weapon of weapons) {
    for (const charId of weapon.used_by) {
      const char = characters.find((c) => c.id === charId);
      if (char && !char.weapons.includes(weapon.id)) {
        errors.push(
          `Weapon "${weapon.name}" lists character "${charId}" but character does not list weapon`
        );
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Data linking validation failed:\n${errors.map((e) => `  - ${e}`).join("\n")}`
    );
  }

  return { valid: true, errors: [] };
}
