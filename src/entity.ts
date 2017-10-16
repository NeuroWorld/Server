import Victor = require("victor");
import Field from "./field";
import {Properties} from "./properties";
import WORLD_SIZE = Properties.WORLD_SIZE;
import ENTITY_SPEED = Properties.ENTITY_SPEED;

export default class Entity {
    public health: number;
    public hunger: number;
    public position: Victor;
    public direction: Victor;

    constructor(public id: number) {
        this.health = 1;
        this.hunger = 1;
        this.position = new Victor(Math.random() * WORLD_SIZE, Math.random() * WORLD_SIZE);
        this.direction = new Victor(Math.random() - 0.5, Math.random() - 0.5).normalize();
    }

    public update(self: Field, top: Field, right: Field, down: Field, left: Field) {
        self.food = 0;
        this.move();
        this.turn();
    }

    public move() {
        this.position.add(this.direction.clone().multiplyScalar(ENTITY_SPEED));
        this.position.x = (this.position.x + WORLD_SIZE) % WORLD_SIZE;
        this.position.y = (this.position.y + WORLD_SIZE) % WORLD_SIZE;
    }

    public turn() {
        this.direction.rotate(0.4 * (Math.random() - 0.5));
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
