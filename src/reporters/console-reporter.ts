import DTOField from "../dto-field";
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

    public updateField(field: Field, dtoField: DTOField) {
        if (field.fire - dtoField.fire !== 0) {
            console.log(`Field ${field.name()} fire changed: ${field.fire - dtoField.fire}.`);
        }

        if (field.water - dtoField.water !== 0) {
            console.log(`Field ${field.name()} water changed: ${field.water - dtoField.water}.`);
        }

        if (field.rocks - dtoField.rocks !== 0) {
            console.log(`Field ${field.name()} rocks changed: ${field.rocks - dtoField.rocks}.`);
        }

        if (field.food - dtoField.food !== 0) {
            console.log(`Field ${field.name()} food changed: ${field.food - dtoField.food}.`);
        }
    }
}
