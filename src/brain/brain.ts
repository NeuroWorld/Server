import mathjs = require("mathjs");
import {Properties} from "../properties";
import BRAIN_MUTABILITY = Properties.BRAIN_MUTABILITY;

export default class Brain {

    protected static sigmoid(x: number): number {
        return 1 / ( 1 + Math.pow(Math.E, -x));
    }

    protected weights;

    protected biases;

    protected mutability;

    public constructor(protected height: number, protected layers: number) {
        this.mutability = BRAIN_MUTABILITY;
    }

    public randomize(): void {
        this.weights = mathjs.random([this.layers, this.height, this.height], 1);
        this.biases = mathjs.random([this.layers, this.height], -1, 1);
    }

    public mutate(): Brain {
        const brain = new Brain(this.height, this.layers);

        brain.mutability = this.mutability * 0.99;
        brain.weights = mathjs.clone(this.weights);
        brain.biases = mathjs.clone(this.biases);
        brain.mutateProperties();

        return brain;
    }

    public think(inputs: number[]): number[] {
        if (inputs.length !== this.height) {
            throw new Error("Well wrong input and brain dimensions.");
        }

        const outputs = inputs.slice();

        for (let i = 0; i < this.layers; ++i) {
            const product = mathjs.multiply(this.weights[i], outputs);
            const biased = mathjs.add(product, this.biases[i]);
            for (let j = 0; j < outputs.length; ++j) {
                outputs[j] = Brain.sigmoid(biased[j]);
            }
        }

        return outputs;
    }

    protected mutateProperties() {
        for (let i = 0; i < this.weights.length; ++i) {
            for (let j = 0; j < this.weights[i].length; ++j) {
                this.biases[i][j] += this.mutability * mathjs.random(-0.5, 0.5);
                for (let k = 0; k < this.weights[i][j].length; ++k) {
                    this.weights[i][j][k] += this.mutability * mathjs.random(-0.5, 0.5);
                }
            }
        }
    }
}
