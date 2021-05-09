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
        this.io.on("connection", (socket) => {
            console.log("new client connected");

            socket.on("save", (name) => {});
        });
    }

    new_file_received(file_info) {
        this.io.emit("file", file_info);
    }

    progress_info(
        info = { progress: "", file_id: "", file_name: "", speed: 0 }
    ) {
        this.io.emit("progress", info);
    }
}

let io = new IO();

module.exports = io;
