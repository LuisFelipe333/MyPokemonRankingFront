import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/models/pokemon';
import { PokemonFiltersComponent, FilterChangeEvent } from '../pokemon-ranking/components/pokemon-filters/pokemon-filters.component';

@Component({
  selector: 'app-pokemon-ranking-public',
  imports: [CommonModule, PokemonFiltersComponent],
  templateUrl: './pokemon-ranking-public.component.html',
  styleUrl: './pokemon-ranking-public.component.scss'
})
export class PokemonRankingPublicComponent {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);

  public pokemonList: Pokemon[] = [];
  public isLoading: boolean = true;
  public errorMessage: string = '';
  public username: string = '';

  private currentFilters?: FilterChangeEvent;

  ngOnInit(): void {
    // Obtenemos el username desde los parámetros de la URL (/share/:username)
    this.username = this.route.snapshot.paramMap.get('username') || '';

    if (this.username) {
      this.loadPublicRanking();
    } else {
      this.errorMessage = 'No user specified.';
      this.isLoading = false;
    }
  }

  public loadPublicRanking(filters?: FilterChangeEvent): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.pokemonService.getPublicRanking(
      this.username,
      filters?.type,
      filters?.generation
    ).subscribe({
      next: (data) => {
        this.pokemonList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = `Could not load ${this.username}'s ranking or user does not exist.`;
        this.isLoading = false;
      }
    });
  }

  public onFiltersApplied(filters: FilterChangeEvent): void {
    this.currentFilters = filters;
    this.loadPublicRanking(filters);
  }
}
