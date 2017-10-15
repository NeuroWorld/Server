import Field from "../field";
import DtoField from "./dto-field";

export default class DtoFieldUpdate {
    public food;
    public water;
    public rocks;
    public fire;
    public x;
    public y;

    constructor(current: Field, old: DtoField) {
        this.setIfNotNull(current, old, "fire");
        this.setIfNotNull(current, old, "water");
        this.setIfNotNull(current, old, "rocks");
        this.setIfNotNull(current, old, "food");

        this.x = current.x;
        this.y = current.y;
    }

    protected setIfNotNull(current: Field, old: DtoField, field: string) {
        if (old[field] - current[field]) {
            this[field] = old[field] - current[field];
        }
    }
}
