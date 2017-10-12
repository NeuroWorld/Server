import {Actor} from "./actor";
import {range} from "./utils";
import {Brain} from "./brain";
import {World} from "./world";

export class Runner {
    protected world: World;
    protected brain: Brain;
    protected actors: Actor[];

    constructor() {
        this.world = new World();
        this.brain = new Brain();
        this.actors = range(10).map(i => new Actor(i));
    }

    run() {
    }
}
