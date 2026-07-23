import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/models/pokemon';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-pokemon-ranking',
  imports: [CommonModule, CdkDropList, CdkDrag, FormsModule],
  templateUrl: './pokemon-ranking.component.html',
  styleUrl: './pokemon-ranking.component.scss'
})
export class PokemonRankingComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  public pokemonList: Pokemon[] = [];
  public isLoading: boolean = true;
  public errorMessage: string = '';

  public searchQuery: string = '';
  public pokemonFound: any = null;
  public searchError: string = '';
  public isSaving: boolean = false;

  public allPokemonNames: string[] = [];

  public customPosition: number | null = null; // Variable para almacenar la posición personalizada, en caso de que sea nula se manda a la ultima posicion

  ngOnInit(): void {
    this.loadRanking();
    this.preloadPokemonNames();
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

  private preloadPokemonNames(): void {
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=1025').subscribe({
      next: (res) => {
        this.allPokemonNames = res.results.map((p: any) => p.name);
      },
      error: (err) => console.error('No se pudo precargar la lista de nombres', err)
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

  public saveToRanking(): void {
    if (!this.pokemonFound) return;

    this.isSaving = true;

    // Si el usuario escribió una posición, usamos esa. Si no, va al final.
    const targetPosition = this.customPosition !== null && this.customPosition > 0
    ? this.customPosition
    : this.pokemonList.length + 1;

    // Construimos el objeto JSON exacto incluyendo la posición requerida
    const newPokemonData = {
      pokemonApiId: this.pokemonFound.id,
      name: this.pokemonFound.name,
      position: targetPosition // Usamos la posición personalizada o la última posición
    };

    this.pokemonService.addtoRanking(newPokemonData).subscribe({
      next: () => {
        this.isSaving = false;
        this.closeModal();
        this.loadRanking(); // Recargamos la lista para ver el nuevo Pokémon
      },
      error: () => {
        alert('Error al agregar el Pokémon al ranking ');
        this.isSaving = false;
      }
    });
  }

  public openModal(): void {
    const dialog = document.getElementById('addPokemonModal') as HTMLDialogElement;
    if (dialog) dialog.showModal();
  }

  public closeModal(): void {
    const dialog = document.getElementById('addPokemonModal') as HTMLDialogElement;
    if (dialog) dialog.close();
    // Limpiamos el formulario al cerrar
    this.searchQuery = '';
    this.pokemonFound = null;
    this.searchError = '';
    this.customPosition = null; // Limpiamos la posición personalizada al cerrar
  }

  public searchPokemon(): void {
    if (!this.searchQuery) return;
    
    this.searchError = '';
    this.pokemonFound = null;

    this.pokemonService.searchInPokeApi(this.searchQuery).subscribe({
      next: (res) => {
        this.pokemonFound = {
          id: res.id,
          name: res.name,
          sprite: res.sprites.other['official-artwork'].front_default
        };
      },
      error: () => {
        this.searchError = 'No se encontró ningún Pokémon con ese nombre o ID.';
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

}
