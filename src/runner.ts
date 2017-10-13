import Entity from "./entity";
import Reporter from "./reporters/console-reporter";
import {range} from "./utils";
import World from "./world";

export default class Runner {
    protected world: World;
    protected entities: Entity[];
    protected reporter: Reporter;

    constructor() {
        this.reporter = new Reporter();
        this.world = new World(this.reporter);
        this.entities = range(10).map((i) => new Entity(i));
    }

    public async run() {
        // todo: proper game loop
        try {
            await new Promise(() => {
                setInterval(() => {
                    console.log("DSA");
                    this.world.update();
                    this.world.bake();
                }, 1000);
            });
        } catch (e) {
            console.log("Game loop ended.");
        }
    }
}
