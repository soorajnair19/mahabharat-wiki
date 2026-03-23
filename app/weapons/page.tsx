"use client";

import { useMemo, useState } from "react";
import { getAllWeapons, getCharacterById } from "@/lib/data";
import { WeaponCard } from "@/components/WeaponCard";
import { CardGrid } from "@/components/CardGrid";
import { Filters } from "@/components/Filters";
import { Modal } from "@/components/Modal";
import { WeaponStatIcon } from "@/components/AttributeIcons";
import type { Weapon } from "@/lib/types";

export default function WeaponsPage() {
  const weapons = useMemo(() => getAllWeapons(), []);
  const [rarityFilter, setRarityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);

  const filteredWeapons = useMemo(() => {
    return weapons.filter((w) => {
      if (rarityFilter && w.rarity !== rarityFilter) return false;
      if (typeFilter && w.type !== typeFilter) return false;
      return true;
    });
  }, [weapons, rarityFilter, typeFilter]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 font-display text-4xl font-bold text-stone-200">
        Weapons
      </h1>

      <Filters
        type="weapons"
        rarityFilter={rarityFilter}
        onRarityChange={setRarityFilter}
        secondaryFilter={typeFilter}
        onSecondaryChange={setTypeFilter}
      />

      <div className="mt-8">
        <CardGrid>
          {filteredWeapons.map((weapon) => (
            <WeaponCard
              key={weapon.id}
              weapon={weapon}
              onClick={() => setSelectedWeapon(weapon)}
            />
          ))}
        </CardGrid>
      </div>

      <Modal
        open={!!selectedWeapon}
        onOpenChange={(open) => !open && setSelectedWeapon(null)}
        title={selectedWeapon?.name}
      >
        {selectedWeapon && (
          <WeaponDetailContent weapon={selectedWeapon} />
        )}
      </Modal>
    </div>
  );
}

function WeaponDetailContent({ weapon }: { weapon: Weapon }) {
  const usedByCharacters = weapon.used_by
    .map((id) => getCharacterById(id))
    .filter(Boolean);

  return (
    <div className="space-y-4">
      <p className="text-stone-400">{weapon.description}</p>

      <div className="flex flex-wrap gap-2">
        <WeaponStatIcon type="type" value={weapon.type} />
        <WeaponStatIcon type="element" value={weapon.element} />
        <WeaponStatIcon type="power" value={`${weapon.power_level}/10`} />
        <WeaponStatIcon type="rarity" value={weapon.rarity} />
      </div>

      <div>
        <h4 className="font-display font-semibold text-stone-200">
          Special Effects
        </h4>
        <ul className="mt-2 list-disc pl-6 text-stone-400">
          {weapon.special_effects.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-display font-semibold text-stone-200">
          Limitations
        </h4>
        <ul className="mt-2 list-disc pl-6 text-stone-400">
          {weapon.limitations.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>

      {weapon.invocation && (
        <div>
          <h4 className="font-display font-semibold text-stone-200">
            Invocation
          </h4>
          <p className="mt-1 italic text-stone-400">{weapon.invocation}</p>
        </div>
      )}

      <div>
        <h4 className="font-display font-semibold text-stone-200">
          Used By
        </h4>
        <ul className="mt-2 list-disc pl-6 text-stone-400">
          {usedByCharacters.map((c) => (
            <li key={c!.id}>{c!.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
