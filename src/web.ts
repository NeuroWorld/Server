import SocketIO = require("socket.io");
import SocketReporter from "./reporters/socket-reporter";
import World from "./world";
import Socket = SocketIO.Socket;

export default class Web {
    protected io;

    constructor() {
        this.io = SocketIO(3030);
        console.log("socket is up and running");
        this.io.on("connection", (client: Socket) => {
            console.log("New client connected.");
            const reporter = new SocketReporter(client);
            const world = new World(reporter);

            client.on("update", () => {
                console.log("Requested update.");
                world.update();
                world.bake();
                console.log("Update completed.");
            });

            client.on("disconnect", () => {
                console.log("Client disconnected.");
            });
        });
    }
}
