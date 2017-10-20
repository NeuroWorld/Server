import mathjs = require("mathjs");
import Brain from "./brain";

class Result {
    constructor(public sum: number, public index: number) {
    }
}

export default class DummyTest {
    protected startingBrains: Brain[];

    constructor() {
        this.startingBrains = [];
        for (let i = 0; i < 50; ++i) {
            this.startingBrains[i] = new Brain(5, 2);
            this.startingBrains[i].randomize();
        }
    }

    public test() {
        let brains = this.startingBrains.slice();
        for (let i = 0; i < 100; ++i) {
            brains = this.progress(brains, [0.2, 0.3, 0.4, 0.5, 0.6]);
        }
    }

    protected distance(input: number[]): number {
        const ideal = [0.0, 0.0, 0.0, 1, 1];
        return Math.sqrt(ideal.reduce((curry, val, i) => curry + Math.pow(val - input[i], 2), 0));
    }

    protected progress(brains: Brain[], inputs: number[]) {
        const results = brains
            .map((brain) => brain.think(inputs))
            .map((result, index) => new Result(this.distance(result), index))
            .sort((a, b) => Math.sign(-(a.sum - b.sum)));

        const winners = results.slice(results.length - 5, results.length);
        winners.push(results[mathjs.randomInt(results.length - 5)]);
        winners.push(results[mathjs.randomInt(results.length - 5)]);
        winners.push(results[mathjs.randomInt(results.length - 5)]);
        winners.push(results[mathjs.randomInt(results.length - 5)]);
        winners.push(results[mathjs.randomInt(results.length - 5)]);

        console.log("Winner: " + results[results.length - 1].sum);

        const output = [];
        while (output.length !== brains.length) {
            output.push(brains[winners[mathjs.randomInt(winners.length - 1)].index].mutate());
        }
        return output;
    }
}
