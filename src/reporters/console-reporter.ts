import DtoField from "../dtos/dto-field";
import Field from "../field";
import World from "../world";
import IReporter from "./reporter";

export default class ConsoleReporter implements IReporter {
    public newWorld(world: World) {
        console.log(`New world ${world.id}.`);
    }

    public newField(field: Field) {
        console.log(`New field ${field.name()} created: food: ${field.food}, fire: ${field.fire}, water: ${field.water}, rocks: ${field.rocks}`);
    }

    public updateField(field: Field) {
        console.log(`Field ${field.name()} fire has new value: ${field.fire}.`);
        console.log(`Field ${field.name()} water has new value: ${field.water}.`);
        console.log(`Field ${field.name()} rocks has new value: ${field.rocks}.`);
        console.log(`Field ${field.name()} food has new value: ${field.food}.`);
    }
}
