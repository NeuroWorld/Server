import Entity from "../entity";

export default class DtoEntity {
    public id: number;
    public health: number;
    public hunger: number;
    public direction: [number, number];
    public position: [number, number];
    public isDead: boolean;

    constructor(entity: Entity) {
        this.id = entity.id;
        this.health = entity.health;
        this.hunger = entity.hunger;
        this.direction = [entity.direction.x, entity.direction.y];
        this.position = [entity.position.x, entity.position.y];
        this.isDead = entity.isDead;
    }
}
