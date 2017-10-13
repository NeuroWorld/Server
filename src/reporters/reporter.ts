import DTOField from "../dto-field";
import Field from "../field";
import World from "../world";

export default interface IReporter {
    newWorld(world: World);
    newField(field: Field) ;
    updateField(field: Field, dtoField: DTOField);
}
