const express = require("express");
const config = require("../config");
const router = express.Router();
const sass = require("node-sass");
const path = require("path");

const create_qrcode = require("../utils/qrcode");

const upload_router = require('./upload')

router.use('/upload', upload_router)

/* GET home page. */
router.get("/", async function (req, res, next) {
    if (req.socket.localAddress == req.socket.remoteAddress) {
        const qrcode_base64 = await create_qrcode(config.url);

        res.render("local_view", {
            data: { url: config.url, qrcode: qrcode_base64.toString("base64") },
        });
        return;
    }

    const scss_path = path.join(
        __dirname + "",
        "../public/stylesheets/sender.scss"
    );

    const scss_data = sass.renderSync({ file: scss_path });
    res.render("sender_view_1", {
        data: { url: config.url, style: scss_data.css },
    });
});

router.get("/sender", async (req, res) => {
    const ip = config.local_ip;

    const url = "http://" + ip + `:${config.port}`;

    const scss_path = path.join(
        __dirname + "",
        "../public/stylesheets/sender.scss"
    );
    const scss_data = sass.renderSync({ file: scss_path });
    res.render("sender_view_1", {
        data: {
            url,
            style: scss_data.css,
        },
    });
});

module.exports = router;
