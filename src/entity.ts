import Victor = require("victor");

export class Entity {
    public health: number;
    public hunger: number;
    public speed: number;
    public position: Victor;
    public direction: Victor;

    constructor(public id: number) {
        this.health = 1;
        this.hunger = 1;
        this.position = new Victor(Math.random() * 100, Math.random() * 100);
        this.direction = new Victor(Math.random(), Math.random()).normalize();
    }

    public move() {
        this.position.add(this.direction);
    }

    public turn() {
        this.direction.rotate(0.01);
    }

    public eat(food: number): number {
        if (food > this.hunger) {
            food -= this.hunger;
            this.hunger = 0;
            return food;
        } else {
            this.hunger -= food;
            return 0;
        }
    }
}
