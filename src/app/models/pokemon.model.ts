export class Pokemon {
    id: number;
    order: number;
    name: string;
    types: Type[];
    sprites: Sprite;
    stats: Stat[];

    constructor() {
        this.types = [];
    }
}

class Type {
    slot: number;
    type: {
        name: string;
    }
}

class Sprite {
    front_default: string;
}

class Stat {
    base_stat: number;
    stat: {
        name: string;
    }
}