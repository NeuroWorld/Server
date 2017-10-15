import Field from "../field";

export default class DtoField {
    public fire: number;
    public water: number;
    public food: number;
    public rocks: number;
    public x: number;
    public y: number;
    public id: number;

    constructor(field: Field) {
        this.id = field.id;
        this.x = field.x;
        this.y = field.y;
        this.fire = field.fire;
        this.water = field.water;
        this.food = field.food;
        this.rocks = field.rocks;
    }
}
