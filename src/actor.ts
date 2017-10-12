export class Actor {
    public health: number;
    public hunger: number;

    constructor(public id: number) {
        this.health = 1;
        this.hunger = 1;
    }    
}
