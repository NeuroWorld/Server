import Reporter from "./reporters/console-reporter";
import World from "./world";

export default class Runner {
    protected world: World;
    protected reporter: Reporter;

    constructor() {
        this.reporter = new Reporter();
        this.world = new World(this.reporter);
    }

    public async run() {
        // todo: proper game loop
        try {
            await new Promise(() => {
                setInterval(() => {
                    this.world.update();
                }, 100);
            });
        } catch (e) {
            console.log("Game loop ended.");
        }
    }
}
