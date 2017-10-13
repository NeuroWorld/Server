import DTOField from "../dto-field";
import Field from "../field";
import World from "../world";
import IReporter from "./reporter";

export default class SocketReporter implements IReporter {
    public newWorld(world: World) {
        throw new Error("Method not implemented.");
    }

    public newField(field: Field) {
        throw new Error("Method not implemented.");
    }

    public updateField(field: Field, dtoField: DTOField) {
        throw new Error("Method not implemented.");
    }
}
