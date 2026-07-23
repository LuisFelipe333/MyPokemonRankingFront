export interface Pokemon {
  id: number;           
  pokemonApiId: number; 
  name: string;
  position: number;     
  generation: number;
  primaryType?: string;   
  secondaryType?: string;
  types?: string[];      // Lo dejamos opcional para construirlo
}