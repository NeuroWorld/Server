import {Brain} from "./brain";
import {Entity} from "./entity";
import {Reporter} from "./reporter";
import {range} from "./utils";
import {World} from "./world";

export class Runner {
    protected world: World;
    protected brain: Brain;
    protected entities: Entity[];
    protected reporter: Reporter;

    constructor() {
        this.reporter = new Reporter();
        this.world = new World(this.reporter);
        this.brain = new Brain();
        this.entities = range(10).map((i) => new Entity(i));
    }

    public run() {
        while (true) {
            this.world.update();
            this.world.bake();
        }
    }
}
