import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer/trainer.service';
import { Observable, forkJoin, Subscription } from 'rxjs';
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
  allPokemons: Pokemon[] = [];
  allowSave: boolean = false;
  private maxPokemonNumber = 151;

  constructor(private activatedRoute: ActivatedRoute,
    private trainerService: TrainerService, private router: Router,
    private pokemonService: PokemonsService, private snackbar: MatSnackBar){
      this.offset = 0;
    }

  ngOnInit(): void {
    this.getProfileDataSubscription();
    this.getPage();
  }

  private getProfileDataSubscription(): void {
    this.profileDataSubscription = this.activatedRoute.data.subscribe(({trainer}: { trainer: Trainer })=>{
      this.trainer = trainer;
      setTimeout(() => {
        this.isFetching = false;
      }, 1000);  //simular 1 segundo de tiempo de carga de datos
    });
  }

  getPage() {
    if(!this.isLoading && !this.isLastPage) {
      this.isLoading = true;
      this.pokemonService.getPokemonList(0,151)
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

  /* onScroll(event: Event): void {
    const element: HTMLDivElement = event.target as HTMLDivElement;
    if(element.scrollHeight - element.scrollTop < 1000) {
      this.getPage(this.offset);
    }
  } */
  
  handlePokemonSelection(pokemon: Pokemon): void {
    if (!pokemon.isSelected) {
      const selectedCount = this.pokemons.filter(p => p.isSelected).length;
      if (selectedCount < 3) {
        pokemon.isSelected = true;
      } else {
        this.snackbar.open('Solo puedes seleccionar un máximo de 3 pokemones', 'OK', { duration: 3000 });
      }
    } else {
      pokemon.isSelected = false;
    }
  }

  isCardDisabled(pokemon: Pokemon): boolean {
    const selectedCount = this.pokemons.filter(p => p.isSelected).length;
    return selectedCount >= 3 && !pokemon.isSelected;
  }

  private getPokemon(list: PokemonList[]) {
    const arr: Observable<Pokemon>[] = [];
    list.map((value: PokemonList)=> {
      arr.push(
        this.pokemonService.getPokemonDetail(value.name)
      )
    });

    forkJoin([...arr]).subscribe((pokemons: Pokemon[]) => {
      this.pokemons.push(...pokemons);
      this.allPokemons = [...this.pokemons];
      this.isLoading = false;
    });
  }

  filterPokemons(): void {
    const searchTerm = this.search.value.toLowerCase();
    if (searchTerm) {
        this.pokemons = this.allPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm) ||
            pokemon.id.toString().includes(searchTerm)
        );
    } else {
        this.pokemons = [...this.allPokemons];
    }
  }

  submitSelection(): void {
    this.trainer.pokemons_owned = this.pokemons.filter(p => p.isSelected);
    console.log("seleccionados", this.pokemons.filter(p => p.isSelected))
    this.trainerService.storeTrainer(this.trainer);
    this.router.navigate(['/profile']);
  }

  ngOnDestroy(): void {
    this.profileDataSubscription.unsubscribe();
  }

}
