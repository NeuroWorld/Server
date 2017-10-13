import {Field} from "./field";
import {Reporter} from "./reporter";

export class World {
    protected fields: Field[][];

    constructor(protected reporter: Reporter) {
        this.fields = [];
        for (let i = 0; i < 100; ++i) {
            this.fields[i] = [];
            for (let j = 0; j < 100; ++j) {
                this.fields[i][j] = new Field(reporter);
            }
        }
    }

    public update() {
        for (let i = 1; i < 99; ++i) {
            for (let j = 1; j < 99; ++j) {
                this.fields[i][j].update(
                    this.fields[i + 1][j],
                    this.fields[i][j + 1],
                    this.fields[i - 1][j],
                    this.fields[i][j - 1],
                );
            }
        }
    }

    public bake() {
        this.fields.forEach((field) => field.forEach(f => f.bake()));
    }
}
