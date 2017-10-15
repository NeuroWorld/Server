import DtoField from "./dtos/dto-field";
import Field from "./field";
import {Properties} from "./properties";
import Reporter from "./reporters/reporter";
import WORLD_SIZE = Properties.WORLD_SIZE;

export default class World {
    public id: number;
    protected fields: Field[][];

    constructor(protected reporter: Reporter) {
        // todo: generate id properly
        this.id = Math.ceil(Math.random() * 10000);
        this.fields = [];

        for (let i = 0; i < WORLD_SIZE; ++i) {
            this.fields[i] = [];
            for (let j = 0; j < WORLD_SIZE; ++j) {
                this.fields[i][j] = new Field(i, j, reporter);
            }
        }

        reporter.newWorld(this);
    }

    public update() {
        const p = WORLD_SIZE + 1;
        const m = WORLD_SIZE - 1;
        const s = WORLD_SIZE;

        for (let i = 0; i < WORLD_SIZE; ++i) {
            for (let j = 0; j < WORLD_SIZE; ++j) {
                this.fields[i][j].update(
                    this.fields[i][(j + p) % s],
                    this.fields[(i + p) % s][j],
                    this.fields[i][(j + m) % s],
                    this.fields[(i + m) % s][j],
                );
            }
        }
    }

    public bake() {
        const dtoFields: DtoField[] = [];

        this.fields.forEach((field) => field.forEach((f) => {
            const dtoField = f.bake();
            if (dtoField) {
                dtoFields.push(dtoField);
            }
        }));

        this.reporter.updateFields(dtoFields);
    }
}
