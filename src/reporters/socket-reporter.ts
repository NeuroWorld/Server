import DtoEntity from "../dtos/dto-entity";
import DtoField from "../dtos/dto-field";
import Field from "../field";
import {Properties} from "../properties";
import World from "../world";
import IReporter from "./reporter";
import Socket = SocketIO.Socket;
import WORLD_SIZE = Properties.WORLD_SIZE;

export default class SocketReporter implements IReporter {
    constructor(protected client: Socket) {
    }

    public newWorld(world: World) {
        this.client.emit("world-new", {worldSize: WORLD_SIZE});
    }

    public newField(field: Field) {
        this.client.emit("field-new", new DtoField(field));
    }

    public newEntities(entities: DtoEntity[]) {
        this.client.emit("entities-new", entities);
    }

    public updateEntities(entities: DtoEntity[]) {
        if (entities.length > 0) {
            this.client.emit("entities-update", entities);
        }
    }

    public updateField(field: Field) {
        this.client.emit("field-update", new DtoField(field));
    }

    public updateFields(fields: DtoField[]) {
        if (fields.length > 0) {
            this.client.emit("fields-update", fields);
        }
    }
}
