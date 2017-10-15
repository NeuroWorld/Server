import {clamp, round} from "lodash";
import DtoField from "./dtos/dto-field";
import Reporter from "./reporters/reporter";
import {between} from "./utils";

export default class Field {
    public food: number;
    public water: number;
    public rocks: number;
    public fire: number;
    public changes: Array<(self: Field) => void>;

    constructor(public x: number, public y: number, protected reporter: Reporter) {
        this.food = Math.random();
        this.fire = Math.random() > 0.9 ? Math.random() : 0;
        this.water = Math.random();
        this.rocks = Math.random();
        this.changes = [];

        reporter.newField(this);
    }

    /**
     * todo: extract math somewhere else
     * @param {Field} top
     * @param {Field} right
     * @param {Field} down
     * @param {Field} left
     */
    public update(top: Field, right: Field, down: Field, left: Field) {
        // Fire spread
        if (this.fire > 0.1 && this.food > 0) {
            // todo: randomize and properly calculate fire spread
            top.changes.push((self: Field) => {
                if (self.food > 0) {self.fire += 0.1 * this.fire; }
            });
            right.changes.push((self: Field) => {
                if (self.food > 0) {self.fire += 0.1 * this.fire; }
            });
            down.changes.push((self: Field) => {
                if (self.food > 0) {self.fire += 0.1 * this.fire; }
            });
            left.changes.push((self: Field) => {
                if (self.food > 0) {self.fire += 0.1 * this.fire; }
            });
        }

        // Fire update
        if (this.fire > 0 && this.food > 0)  {
            // todo: make fire behave nonlinearly
            this.changes.push(function(self: Field) {
                self.food -= self.fire * 0.1;
                self.fire -= self.water * 0.1;
                self.water -= self.fire * 0.1;
            });
        }

        if (this.fire > this.food) {
            this.changes.push(function(self: Field) {
                self.food = 0;
                self.fire = 0;
            });
        }

        // Regenerate food
        if (this.fire === 0) {
            this.changes.push(function(self: Field) {
                self.food += Math.random() > 0.99 ? 0.1 * (1 - self.rocks) : 0;
            });

            top.changes.push((self: Field) => {self.food += this.food * 0.1; });
            right.changes.push((self: Field) => {self.food += this.food * 0.1; });
            down.changes.push((self: Field) => {self.food += this.food * 0.1; });
            left.changes.push((self: Field) => {self.food += this.food * 0.1; });
        }

        // Start a fire
        if (this.food > 1 && this.fire === 0) {
            this.changes.push(function(self: Field) {
                self.fire = Math.random() > 0.997 ? Math.random() : 0;
            });
        }
    }

    public name(): string {
        return `(${this.x} ${this.y})`;
    }

    public bake() {
        const dtoField = new DtoField(this);

        for (const change of this.changes) {
            change(this);
        }

        this.fire = round(Math.max(0, this.fire), 2);
        this.food = round(Math.max(0, this.food), 2);
        this.water = round(between(this.water), 2);
        this.rocks = round(between(this.rocks), 2);

        this.changes = [];

        this.reporter.updateField(this, dtoField);
    }
}
