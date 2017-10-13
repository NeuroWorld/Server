import SocketIO = require("socket.io");
import Runner from "./runner";

export default class Web {
    protected io;

    constructor() {
        this.io = SocketIO(3030);

        this.io.on("connection", function(client){
            const runner = new Runner();
            runner.run();

            console.log("connected");
            client.on("event", function(data){});
            client.on("disconnect", function(){});
        });
    }
}
