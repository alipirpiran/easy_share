const router = require("express").Router();
const multer = require("multer");
const config = require("../config");
const upload = multer();
const socket = require("../utils/socket");

router.post("/", upload.array("file"), async (req, res) => {
    res.redirect(config.url);
    if (req.files.length == 0) return;
    for (const file of req.files) socket.new_file_received(file);
});

module.exports = router;
