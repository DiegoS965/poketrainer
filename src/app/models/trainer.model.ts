import { Pokemon } from "./pokemon.model";

export class Trainer {
    name: string;
    id: number;
    hobbies: Hobbies[];
    birthdate: Date;
    image_path: string;
    dui?: string;
    minors_id?: string;
    pokemons_owned: Pokemon[];

    constructor(name: string, id: number, image_path: string, hobbies: Hobbies[], pokemons: Pokemon[] ){
        this.name = name;
        this.id = id;
        this.image_path = image_path;
        this.hobbies = hobbies;
        /* this.dui = '';
        this.minors_id = ''; */
        this.pokemons_owned = pokemons;
    }

}

class Hobbies {
    name: string;
}
