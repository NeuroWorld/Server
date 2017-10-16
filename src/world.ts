import {range} from "lodash";
import DtoEntity from "./dtos/dto-entity";
import DtoField from "./dtos/dto-field";
import Entity from "./entity";
import Field from "./field";
import {Properties} from "./properties";
import Reporter from "./reporters/reporter";
import WORLD_SIZE = Properties.WORLD_SIZE;
import ENTITY_COUNT = Properties.ENTITY_COUNT;

export default class World {
    public id: number;
    protected tick: number;
    protected fields: Field[][];
    protected entities: Entity[];

    constructor(protected reporter: Reporter) {
        // todo: generate id properly
        this.id = Math.ceil(Math.random() * 10000);
        this.tick = 0;
        this.fields = [];
        this.entities = [];

        for (let i = 0; i < WORLD_SIZE; ++i) {
            this.fields[i] = [];
            for (let j = 0; j < WORLD_SIZE; ++j) {
                this.fields[i][j] = new Field(i, j, this.reporter);
            }
        }

        this.entities = range(ENTITY_COUNT).map((i) => new Entity(i));

        this.reporter.newWorld(this);
        this.reporter.newEntities(this.entities.map((e) => new DtoEntity(e)));
    }

    public update() {
        this.updateEntities();

        this.buildFields();
        this.bakeFields();
    }

    protected updateEntities() {
        const p = WORLD_SIZE + 1;
        const m = WORLD_SIZE - 1;
        const s = WORLD_SIZE;

        this.entities.forEach((entity) => {
            const x = Math.floor(entity.position.x);
            const y = Math.floor(entity.position.y);

            entity.update(
                this.fields[x][y],
                this.fields[x][(y + p) % s],
                this.fields[(x + p) % s][y],
                this.fields[x][(y + m) % s],
                this.fields[(x + m) % s][y],
            );
        });

        this.reporter.updateEntities(this.entities.map((e) => new DtoEntity(e)));
    }

    protected buildFields() {
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

    protected bakeFields() {
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
