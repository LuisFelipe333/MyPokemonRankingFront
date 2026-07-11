import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = `${environment.apiUrl}/pokemon`;
  
  
  private http = inject(HttpClient);

  // OBTENER EL RANKING (GET)
  getRanking(type?: string, generation?: number): Observable<Pokemon[]> {
    let params = new HttpParams();
    
    if (type) {
      params = params.set('type', type);
    }
    if (generation) {
      params = params.set('generation', generation.toString());
    }

    return this.http.get<Pokemon[]>(this.apiUrl, { params });
  }

  // ELIMINAR DEL RANKING (DELETE)
  deleteFromRanking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addtoRanking(pokemonData: { pokemonApiId: number; name: string }): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.apiUrl, pokemonData);
  }

  updatePosition(id: number, newPosition: number): Observable<Pokemon> {
    return this.http.put<Pokemon>(
      `${this.apiUrl}/${id}/position`, 
      newPosition, 
      {
        headers: { 'Content-Type': 'application/json' } // Especifica el tipo de contenido como JSON 
      }
    );
  }

}
