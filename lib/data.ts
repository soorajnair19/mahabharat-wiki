import type { Character, Weapon } from "./types";
import { validateLinks } from "./linking";

import arjunaData from "@/data/characters/arjuna.json";
import bhimaData from "@/data/characters/bhima.json";
import yudhishthiraData from "@/data/characters/yudhishthira.json";
import nakulaData from "@/data/characters/nakula.json";
import sahadevaData from "@/data/characters/sahadeva.json";
import krishnaData from "@/data/characters/krishna.json";
import abhimanyuData from "@/data/characters/abhimanyu.json";
import draupadiData from "@/data/characters/draupadi.json";
import ghatotkachaData from "@/data/characters/ghatotkacha.json";
import panduData from "@/data/characters/pandu.json";
import dhritarashtraData from "@/data/characters/dhritarashtra.json";
import duryodhanaData from "@/data/characters/duryodhana.json";
import karnaData from "@/data/characters/karna.json";
import bhishmaData from "@/data/characters/bhishma.json";
import dronacharyaData from "@/data/characters/dronacharya.json";
import kripacharyaData from "@/data/characters/kripacharya.json";
import dushasanaData from "@/data/characters/dushasana.json";
import ashwatthamaData from "@/data/characters/ashwatthama.json";
import shakuniData from "@/data/characters/shakuni.json";

import gandivaData from "@/data/weapons/gandiva.json";
import brahmastraData from "@/data/weapons/brahmastra.json";
import pashupatastraData from "@/data/weapons/pashupatastra.json";
import gadaData from "@/data/weapons/gada.json";
import sudarshanaChakraData from "@/data/weapons/sudarshana_chakra.json";
import vijayaBowData from "@/data/weapons/vijaya_bow.json";
import vasaviShaktiData from "@/data/weapons/vasavi_shakti.json";

const arjuna = arjunaData as Character;
const bhima = bhimaData as Character;
const yudhishthira = yudhishthiraData as Character;
const nakula = nakulaData as Character;
const sahadeva = sahadevaData as Character;
const krishna = krishnaData as Character;
const abhimanyu = abhimanyuData as Character;
const draupadi = draupadiData as Character;
const ghatotkacha = ghatotkachaData as Character;
const pandu = panduData as Character;
const dhritarashtra = dhritarashtraData as Character;
const duryodhana = duryodhanaData as Character;
const karna = karnaData as Character;
const bhishma = bhishmaData as Character;
const dronacharya = dronacharyaData as Character;
const kripacharya = kripacharyaData as Character;
const dushasana = dushasanaData as Character;
const ashwatthama = ashwatthamaData as Character;
const shakuni = shakuniData as Character;

const gandiva = gandivaData as Weapon;
const brahmastra = brahmastraData as Weapon;
const pashupatastra = pashupatastraData as Weapon;
const gada = gadaData as Weapon;
const sudarshanaChakra = sudarshanaChakraData as Weapon;
const vijayaBow = vijayaBowData as Weapon;
const vasaviShakti = vasaviShaktiData as Weapon;

const characters: Character[] = [
  arjuna,
  bhima,
  yudhishthira,
  nakula,
  sahadeva,
  krishna,
  abhimanyu,
  draupadi,
  ghatotkacha,
  pandu,
  dhritarashtra,
  duryodhana,
  karna,
  bhishma,
  dronacharya,
  kripacharya,
  dushasana,
  ashwatthama,
  shakuni,
];

const weapons: Weapon[] = [
  gandiva,
  brahmastra,
  pashupatastra,
  gada,
  sudarshanaChakra,
  vijayaBow,
  vasaviShakti,
];

export function getAllCharacters(): Character[] {
  return characters;
}

export function getAllWeapons(): Weapon[] {
  return weapons;
}

export function getCharacterById(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}

export function getWeaponById(id: string): Weapon | undefined {
  return weapons.find((w) => w.id === id);
}

export function getCharactersByWeapon(weaponId: string): Character[] {
  return characters.filter((c) => c.weapons.includes(weaponId));
}

export function getWeaponsByCharacter(characterId: string): Weapon[] {
  return weapons.filter((w) => w.used_by.includes(characterId));
}

// Build-time validation of bidirectional links
validateLinks(characters, weapons);
