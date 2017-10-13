import Field from "./field";

export default class DTOField {
    public fire: number;
    public water: number;
    public food: number;
    public rocks: number;

    constructor(field: Field) {
        this.fire = field.fire;
        this.water = field.water;
        this.food = field.food;
        this.rocks = field.rocks;
    }
}
