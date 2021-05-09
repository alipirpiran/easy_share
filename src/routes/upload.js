const router = require("express").Router();
const multer = require("multer");
const config = require("../config");
const upload = multer();
const socket = require("../utils/socket");

const files = require("../utils/files");

let last_file_id = 0;

router.post("/", set_event_listener, upload.array("file"), async (req, res) => {
    res.redirect(config.url);
    if (req.files.length == 0) return;
    for (const file of req.files) {
        file.file_id = req.file_id;
        const { originalname: file_name, size: file_size, file_id } = file;
        socket.new_file_received({ file_name, file_size, file_id });
        files.push(file);
    }
});

function set_event_listener(req, res, next) {
    let progress = 0;
    let last_time = 0;
    let last_size = 0;
    const file_size = req.headers["content-length"];
    req.file_id = last_file_id;
    let speed = 0;

    req.on("data", (chunk) => {
        progress += chunk.length;
        const delta_time = Date.now() - last_time;
        if (delta_time < 500) return;

        speed = (progress - last_size) *1000 / delta_time;
        last_time = Date.now();
        last_size = progress;

        socket.progress_info({
            progress: progress / file_size,
            file_id: req.file_id,
            file_name: "receiving file",
            file_size,
            speed,
        });
    });

    req.on("end", () => {
        // res.send(data.join(""));
    });

    last_file_id++;
    next();
}

module.exports = router;
