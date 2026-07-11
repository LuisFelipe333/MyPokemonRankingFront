import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/models/pokemon';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-pokemon-ranking',
  imports: [CommonModule, CdkDropList, CdkDrag],
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

  public onDrop(event: CdkDragDrop<Pokemon[]>): void {
    if (event.previousIndex === event.currentIndex) return;

    moveItemInArray(this.pokemonList, event.previousIndex, event.currentIndex);

    const targetPosition = event.currentIndex + 1;
    const movedPokemon = this.pokemonList[event.currentIndex];

    this.pokemonService.updatePosition(movedPokemon.id, targetPosition).subscribe({
      next: () => {

        this.loadRanking();
      },
      error: (err) => {
        console.error(err);
        alert('No se pudo guardar la nueva posición en el servidor.');
        // Si falla, revertimos recargando el orden original de la base de datos
        this.loadRanking();
      }
    });
  }

}
