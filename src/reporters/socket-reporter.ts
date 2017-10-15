import DtoField from "../dtos/dto-field";
import Field from "../field";
import World from "../world";
import IReporter from "./reporter";
import Socket = SocketIO.Socket;

export default class SocketReporter implements IReporter {
    constructor(protected client: Socket) {
    }

    public newWorld(world: World) {
       this.client.emit("world-new", {arg: "arg2"});
    }

    public newField(field: Field) {
        this.client.emit("field-new", new DtoField(field));
    }

    public updateField(field: Field) {
        this.client.emit("field-update", new DtoField(field));
    }
}
