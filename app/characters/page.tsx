"use client";

import { useMemo, useState } from "react";
import { getAllCharacters, getWeaponById } from "@/lib/data";
import { CharacterCard } from "@/components/CharacterCard";
import { CardGrid } from "@/components/CardGrid";
import { Filters } from "@/components/Filters";
import { Modal } from "@/components/Modal";
import { CharacterAttributeIcon } from "@/components/AttributeIcons";
import type { Character } from "@/lib/types";
import { calculatePowerIndex, getPowerIndexTier } from "@/lib/powerIndex";

export default function CharactersPage() {
  const characters = useMemo(() => getAllCharacters(), []);
  const [sideFilter, setSideFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("power_desc");
  const [rarityFilter, setRarityFilter] = useState("");
  const [archetypeFilter, setArchetypeFilter] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const filteredCharacters = useMemo(() => {
    return characters.filter((c) => {
      if (sideFilter && c.side !== sideFilter) return false;
      if (rarityFilter && c.rarity !== rarityFilter) return false;
      if (archetypeFilter && c.archetype !== archetypeFilter) return false;
      return true;
    });
  }, [characters, sideFilter, rarityFilter, archetypeFilter]);

  const sortedCharacters = useMemo(() => {
    if (sortFilter === "alpha_asc") {
      return [...filteredCharacters].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    return [...filteredCharacters].sort((a, b) => calculatePowerIndex(b) - calculatePowerIndex(a));
  }, [filteredCharacters, sortFilter]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 font-display text-4xl font-bold text-stone-200">
        Characters
      </h1>

      <Filters
        type="characters"
        sideFilter={sideFilter}
        onSideChange={setSideFilter}
        sortFilter={sortFilter}
        onSortChange={setSortFilter}
        rarityFilter={rarityFilter}
        onRarityChange={setRarityFilter}
        secondaryFilter={archetypeFilter}
        onSecondaryChange={setArchetypeFilter}
      />

      <div className="mt-8">
        <CardGrid>
          {sortedCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => setSelectedCharacter(character)}
            />
          ))}
        </CardGrid>
      </div>

      <Modal
        open={!!selectedCharacter}
        onOpenChange={(open) => !open && setSelectedCharacter(null)}
        title={selectedCharacter?.name}
      >
        {selectedCharacter && (
          <CharacterDetailContent character={selectedCharacter} />
        )}
      </Modal>
    </div>
  );
}

function CharacterDetailContent({ character }: { character: Character }) {
  const weaponDetails = character.weapons.map((id) => getWeaponById(id));
  const powerIndex = calculatePowerIndex(character);
  const tier = getPowerIndexTier(powerIndex);

  const tierClass =
    tier === "legendary"
      ? "text-amber-500"
      : tier === "epic"
      ? "text-purple-400"
      : tier === "rare"
      ? "text-blue-400"
      : "text-stone-400";

  return (
    <div className="space-y-4">
      <p className="text-stone-400">{character.description_long}</p>

      <div>
        <div className="mb-3 inline-flex items-center rounded border border-stone-600/50 bg-stone-700/30 px-3 py-1.5 text-sm">
          <span className="mr-2 text-stone-300">Power Index:</span>
          <span className={`font-semibold ${tierClass}`}>{powerIndex}</span>
        </div>
        <h4 className="font-display font-semibold text-stone-200">
          Attributes
        </h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {Object.entries(character.attributes).map(([key, value]) => (
            <CharacterAttributeIcon key={key} name={key} value={value} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display font-semibold text-stone-200">
          Weapons
        </h4>
        <ul className="mt-2 list-disc pl-6 text-stone-400">
          {weaponDetails
            .filter(Boolean)
            .map((w) => (
              <li key={w!.id}>
                {w!.name} ({w!.type})
              </li>
            ))}
          {weaponDetails.filter(Boolean).length === 0 && (
            <li className="text-stone-500">None</li>
          )}
        </ul>
      </div>

      <div>
        <h4 className="font-display font-semibold text-stone-200">
          Special Abilities
        </h4>
        <ul className="mt-2 list-disc pl-6 text-stone-400">
          {character.special_abilities.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display font-semibold text-stone-200">Aura</h4>
        <p className="mt-1 text-stone-400">{character.aura}</p>
      </div>
    </div>
  );
}
