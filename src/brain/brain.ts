import mathjs = require("mathjs");

export default class Brain {

    protected static sigmoid(x: number): number {
        return 1 / ( 1 + Math.pow(Math.E, -x));
    }

    protected weights;

    protected biases;

    protected mutability = 1;

    public constructor(protected height: number, protected layers: number) {
    }

    public randomize(): void {
        this.weights = mathjs.random([this.layers, this.height, this.height], 1);
        this.biases = mathjs.random([this.layers, this.height], -1, 1);
    }

    public mutate(): Brain {
        const brain = new Brain(this.height, this.layers);
        // brain.mutability = this.mutability / 2;
        brain.weights = mathjs.clone(this.weights);
        brain.biases = mathjs.clone(this.biases);
        for (let i = 0; i < brain.weights.length; ++i) {
            for (let j = 0; j < brain.weights[i].length; ++j) {
                brain.biases[i][j] *= this.mutability * mathjs.random(-1, 1);
                for (let k = 0; k < brain.weights[i][j].length; ++k) {
                    brain.weights[i][j][k] *= this.mutability * mathjs.random(-1, 1);
                }
            }
        }
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
}
