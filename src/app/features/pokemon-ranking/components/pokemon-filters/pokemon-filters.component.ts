import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { POKEMON_TYPES, POKEMON_GENERATIONS } from '../../../../core/constants/pokemon-filters.constants';

export interface FilterChangeEvent {
  type: string;
  generation: string | number;
}

@Component({
  selector: 'app-pokemon-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-filters.component.html',
  styleUrl: './pokemon-filters.component.scss'
})
export class PokemonFiltersComponent {
  @Output() filterChange = new EventEmitter<FilterChangeEvent>();

  types = POKEMON_TYPES;
  generations = POKEMON_GENERATIONS;

  selectedType: string = '';
  selectedGeneration: string | number = '';

  // Notifica los cambios de filtros
  onFilterChange(): void {
    this.filterChange.emit({
      type: this.selectedType,
      generation: this.selectedGeneration
    });
  }

  // Restablece todos los filtros a su estado inicial
  resetFilters(): void {
    this.selectedType = '';
    this.selectedGeneration = '';
    this.onFilterChange();
  }
}