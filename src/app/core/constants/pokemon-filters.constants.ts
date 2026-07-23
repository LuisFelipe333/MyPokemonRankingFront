export interface FilterOption {
  label: string;
  value: string | number;
}

export const POKEMON_TYPES: FilterOption[] = [
  { label: 'All Types', value: '' },
  { label: 'Normal', value: 'normal' },
  { label: 'Fire 🔥', value: 'fire' },
  { label: 'Water 💧', value: 'water' },
  { label: 'Grass 🍃', value: 'grass' },
  { label: 'Electric ⚡', value: 'electric' },
  { label: 'Ice ❄️', value: 'ice' },
  { label: 'Fighting 🥊', value: 'fighting' },
  { label: 'Poison ☠️', value: 'poison' },
  { label: 'Ground ⏳', value: 'ground' },
  { label: 'Flying 🕊️', value: 'flying' },
  { label: 'Psychic 🔮', value: 'psychic' },
  { label: 'Bug 🐛', value: 'bug' },
  { label: 'Rock 🪨', value: 'rock' },
  { label: 'Ghost 👻', value: 'ghost' },
  { label: 'Dragon 🐉', value: 'dragon' },
  { label: 'Dark 🌙', value: 'dark' },
  { label: 'Steel ⚙️', value: 'steel' },
  { label: 'Fairy 🧚', value: 'fairy' }
];

export const POKEMON_GENERATIONS: FilterOption[] = [
  { label: 'All Generations', value: '' },
  { label: 'Gen 1 (Kanto)', value: 1 },
  { label: 'Gen 2 (Johto)', value: 2 },
  { label: 'Gen 3 (Hoenn)', value: 3 },
  { label: 'Gen 4 (Sinnoh)', value: 4 },
  { label: 'Gen 5 (Unova)', value: 5 },
  { label: 'Gen 6 (Kalos)', value: 6 },
  { label: 'Gen 7 (Alola)', value: 7 },
  { label: 'Gen 8 (Galar)', value: 8 },
  { label: 'Gen 9 (Paldea)', value: 9 }
];