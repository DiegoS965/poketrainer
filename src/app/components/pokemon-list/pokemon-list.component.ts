import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer/trainer.service';
import { Subscription } from 'rxjs';
import { Observable, forkJoin } from 'rxjs';
import { PokemonList } from 'src/app/models/pokemon-list.model';
import { PokemonsService } from 'src/app/services/pokemons/pokemons.service';
import { Pokemon } from 'src/app/models/pokemon.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  search: FormControl = new FormControl('');
  isFetching: boolean = true;
  trainer: Trainer;
  profileDataSubscription: Subscription;
  pokemonList: PokemonList;
  private offset: number;
  isLoading: boolean;
  isLastPage = false;
  pokemons: Pokemon[] = [];
  toggleColor: boolean;
  isSearching: boolean = false;
  searchPokemon: Pokemon;

  constructor(private activatedRoute: ActivatedRoute,
    private trainerService: TrainerService, private router: Router,
    private pokemonService: PokemonsService, private snackbar: MatSnackBar){
      this.offset = 0;
    }

  ngOnInit(): void {
    this.profileDataSubscription = this.activatedRoute.data.subscribe(({trainer}: { trainer: Trainer })=>{
      this.trainer = trainer;
      this.isFetching = false;
    });
    this.getPage(this.offset);
  }

  getPage(offset: number) {
    if(!this.isLoading && !this.isLastPage) {
      this.isLoading = true;
      this.pokemonService.getPokemonList(offset)
      .subscribe((list: PokemonList[]) => {
        if(list.length === 0) {
          this.isLastPage = true;
        }

        if(!this.isLastPage) {
          this.getPokemon(list);
        }
      })
    }
  }

  onScroll(event: Event): void {
    const element: HTMLDivElement = event.target as HTMLDivElement;
    if(element.scrollHeight - element.scrollTop < 1000) {
      this.getPage(this.offset);
    }
  }
  
  toggleCardBackground(pokemon: Pokemon): void {
    pokemon.isSelected = !pokemon.isSelected;
  }

  onSearchPokemon(): void {
    const value = this.search.value;
    if (value === '') {
      this.isSearching = false;
    } else {
      this.isSearching = true;
      this.isLoading = true;
      this.pokemonService.getPokemonDetail(value)
      .subscribe({next: (pokemon: Pokemon) => {
        this.searchPokemon = pokemon;
        this.isLoading = false;
      }, error: (error: any) => {
        this.isLoading = false;
        if(error.status === 404) {
          this.snackbar.open('Sorry, Pokemon not found', 'Ok', {
            duration: 5000,
          })
        }
      }})
    }
  }

  private getPokemon(list: PokemonList[]) {
    const arr: Observable<Pokemon>[] = [];
    list.map((value: PokemonList)=> {
      arr.push(
        this.pokemonService.getPokemonDetail(value.name)
      )
    });

    forkJoin([...arr]).subscribe((pokemons: []) => {
      this.pokemons.push(...pokemons);
      this.offset +=20;
      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    this.profileDataSubscription.unsubscribe();
  }

}
