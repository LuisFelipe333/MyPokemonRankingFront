import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/models/pokemon';

@Component({
  selector: 'app-pokemon-ranking',
  imports: [CommonModule],
  templateUrl: './pokemon-ranking.component.html',
  styleUrl: './pokemon-ranking.component.scss'
})
export class PokemonRankingComponent {
  private pokemonService = inject(PokemonService);

  public pokemonList: Pokemon[] = [];
  public isLoading: boolean = true;
  public errorMessage: string = '';

  ngOnInit(): void {
    this.loadRanking();
  }

  public loadRanking(): void {
    this.isLoading = true;
    this.pokemonService.getRanking().subscribe({
      next: (data) => {
        this.pokemonList = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'No se pudo conectar con el servidor backend.';
        this.isLoading = false;
      }
    });
  }

  public deletePokemon(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este Pokémon del ranking?')) {
      this.pokemonService.deleteFromRanking(id).subscribe({
        next: () => {
          
          this.loadRanking();
        },
        error: (err) => {
          alert('Error al intentar eliminar el Pokémon.');
        }
      });
    }
  }
}
