import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-user-pokemons',
  templateUrl: './user-pokemons.component.html',
  styleUrls: ['./user-pokemons.component.sass']
})
export class UserPokemonsComponent implements OnInit {
  @Input() pokemon: Pokemon;
  imageUrl: string;

  ngOnInit(): void {
    this.imageUrl = this.pokemon.sprites.front_default
  }

  getPokemonType(list: any[], index: number) {
    return list.filter(x => x.slot === index)[0]?.type.name;
  }

}
