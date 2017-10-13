import {DTOField} from "./dto-field";
import {Reporter} from "./reporter";
import {between} from "./utils";

export class Field {
    public food: number;
    public water: number;
    public rocks: number;
    public fire: number;
    public changes: Array<(self: Field) => void>;

    constructor(protected reporter: Reporter) {
        this.food = Math.random();
        this.fire = Math.random() > 0.9 ? Math.random() : 0;
        this.water = Math.random();
        this.rocks = Math.random();
        this.changes = [];

        reporter.newField(this);
    }

    public update(top: Field, right: Field, down: Field, left: Field) {
        // Fire spread
        if (this.fire > 0.1) {
            top.changes.push(function(self: Field) { self.fire += 0.01; });
            right.changes.push(function(self: Field) { self.fire += 0.01; });
            down.changes.push(function(self: Field) { self.fire += 0.01; });
            left.changes.push(function(self: Field) { self.fire += 0.01; });
        }

        // Fire update
        if (this.fire > 0) {
            this.changes.push(function(self: Field) {
                self.food -= self.fire * 0.1;
                self.fire -= self.water * 0.1;
                self.water -= self.fire * 0.1;
            });
        }

        // Regenerate food
        if (this.fire === 0) {
            this.changes.push(function(self: Field) {
                self.food += 0.1 * (1 - self.rocks);
                self.food *= 0.1;
            });

            top.changes.push(function(self: Field) { self.food *= 0.01; });
            right.changes.push(function(self: Field) { self.fire += 0.01; });
            down.changes.push(function(self: Field) { self.fire += 0.01; });
            left.changes.push(function(self: Field) { self.fire += 0.01; });
        }

        // Start a fire
        if (this.food > 1 && this.fire === 0) {
            this.changes.push(function(self: Field) {
                self.fire = Math.random() > 0.9 ? Math.random() : 0;
            });
        }
    }

    public bake() {
        const dtoField = new DTOField(this);

        for (const change of this.changes) {
            change(this);
        }

        this.fire = between(this.fire);
        this.food = Math.max(0, this.food);
        this.water = between(this.water);
        this.rocks = between(this.rocks);

        this.changes = [];

        this.reporter.bake(this, dtoField);
    }
}
