import {Field} from './field';
import {DTOField} from "./dto-field";

export class Reporter {
    newField(field: Field) {
        console.log(`New field created: food: ${field.food}, fire: ${field.fire}, water: ${field.water}, rocks: ${field.rocks}`);
    }

    bake(field: Field, dtoField: DTOField) {
        if (field.fire - dtoField.fire !== 0) {
            console.log(`Field fire changed: ${field.fire - dtoField.fire}.`);
        }
        
        if (field.water - dtoField.water !== 0) {
            console.log(`Field water changed: ${field.water - dtoField.water}.`);
        }
        
        if (field.rocks - dtoField.rocks !== 0) {
            console.log(`Field rocks changed: ${field.rocks - dtoField.rocks}.`);
        }

        if (field.food - dtoField.food !== 0) {
            console.log(`Field food changed: ${field.food - dtoField.food}.`);
        }
    }
}
