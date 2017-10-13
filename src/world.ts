import {Field} from "./field";
import {Reporter} from "./reporter";

export class World {
    public id: number;
    protected fields: Field[][];

    constructor(protected reporter: Reporter) {
        // todo: generate id properly
        this.id = Math.ceil(Math.random() * 10000);
        this.fields = [];

        // todo: extract 100 to global const
        for (let i = 0; i < 10; ++i) {
            this.fields[i] = [];
            for (let j = 0; j < 10; ++j) {
                this.fields[i][j] = new Field(i, j, reporter);
            }
        }

        reporter.newWorld(this);
    }

    public update() {
        // todo: make world overlap
        for (let i = 1; i < 9; ++i) {
            for (let j = 1; j < 9; ++j) {
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
        this.fields.forEach((field) => field.forEach((f) => f.bake()));
    }
}
