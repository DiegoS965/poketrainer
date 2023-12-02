import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonList } from 'src/app/models/pokemon-list.model';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number, limit: number = 20) {
    return this.http.get<PokemonList[]>(this.baseUrl + 'pokemon?offset=' + offset + '&limit=' + limit)
      .pipe(
        map((x: any) => x.results)
      )
  }

  getPokemonDetail(pokemon: number | string) : Observable<Pokemon> {
    return this.http.get<Pokemon>(this.baseUrl + 'pokemon/' + pokemon);
  }
}
