import {sum as lSum} from "lodash";
import mathjs = require("mathjs");
import Brain from "./brain/brain";
import Web from "./web";
const socket = new Web();

class Result {
    constructor(public sum: number, public index: number) {}
}

let startingBrains = [];
for (let i = 0; i < 50; ++i) {
    startingBrains[i] = new Brain(5, 2);
    startingBrains[i].randomize();
}

for (let i = 0; i < 100; ++i) {
    startingBrains = progress(startingBrains, [0.2, 0.3, 0.4, 0.5, 0.6]);
}

function progress(brains: Brain[], inputs: number[]) {
    const results = brains
        .map((brain) => brain.think(inputs))
        .map((result, index) => new Result(lSum(result), index))
        .sort((a, b) => Math.sign(+(a.sum - b.sum)));

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
