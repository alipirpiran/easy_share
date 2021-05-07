const { Server } = require("socket.io");

class IO {
    constructor() {
        this.io = Server.prototype;
    }

    init(http) {
        this.io = new Server(http);
        this.set_events();
    }

    set_events() {
        this.io.on("connection", () => {
            console.log("new client connected");
        });
    }

    new_file_received(file) {
        this.io.emit("file", file);
    }
}

let io = new IO();

module.exports = io;
