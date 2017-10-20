import Victor = require("victor");
import Brain from "./brain/brain";
import Field from "./field";
import {Properties} from "./properties";
import WORLD_SIZE = Properties.WORLD_SIZE;
import ENTITY_SPEED = Properties.ENTITY_SPEED;
import ENTITY_HUNGER_SPEED = Properties.ENTITY_HUNGER_SPEED;

export default class Entity {
    public health: number;
    public hunger: number;
    public position: Victor;
    public direction: Victor;
    public isDead: boolean;

    constructor(public id: number, public brain: Brain) {
        this.isDead = false;
        this.health = 10;
        this.hunger = 0;
        this.position = new Victor(Math.random() * WORLD_SIZE, Math.random() * WORLD_SIZE);
        this.direction = new Victor(Math.random() - 0.5, Math.random() - 0.5).normalize();
    }

    public update(under: Field, top: Field, right: Field, down: Field, left: Field) {
        this.eat(under);
        this.move();
        this.turn();

        if (under.fire > 0) {
            this.health -= under.fire * 0.2;
        }

        if (this.hunger - 0.5 > 0) {
            this.health -= (this.hunger - 0.5);
        }

        if (this.hunger < 0.1) {
            this.health += 0.1;
        }

        if (this.health <= 0) {
            this.isDead = true;
        }
    }

    public move() {
        this.position.add(this.direction.clone().multiplyScalar(ENTITY_SPEED));
        this.position.x = (this.position.x + WORLD_SIZE) % WORLD_SIZE;
        this.position.y = (this.position.y + WORLD_SIZE) % WORLD_SIZE;
    }

    public turn() {
        this.direction.rotate(0.4 * (Math.random() - 0.5));
    }

    public eat(field: Field) {
        this.hunger += ENTITY_HUNGER_SPEED;

        if (field.food >= this.hunger) {
            field.changes.push((self) => self.food -= this.hunger);
            this.hunger = 0;
        } else {
            this.hunger -= field.food;
            field.changes.push((self) => self.food = 0);
        }
    }
}
