import {Field} from "./field";

export class World {
    fields: Field[][];

    constructor() {
        for (let i; i < 100; ++i) {
            for (let j; j < 100; ++j) {
                this.fields[i][j] = new Field();
            }   
        }
    }
}
