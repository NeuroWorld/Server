import DtoEntity from "../dtos/dto-entity";
import DtoField from "../dtos/dto-field";
import Field from "../field";
import World from "../world";

export default interface IReporter {
    newWorld(world: World);
    newField(field: Field);
    newEntities(entities: DtoEntity[]);

    updateField(field: Field);
    updateFields(fields: DtoField[]);
    updateEntities(entities: DtoEntity[]);
}
