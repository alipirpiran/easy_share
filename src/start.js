const free_port = require("./utils/free_port");
const ip = require("ip");
const config = require("./config");
const open = require("open");

async function run() {
    const port = await free_port();
    process.env.PORT = port;
    config.port = port;

    require("./bin/www");

    config.local_ip = ip.address();
    config.url = "http://" + config.local_ip + ":" + config.port;

    if (process.env.NODE_ENV == "development") {
        config.production = false;
    }

    if (config.production) open(config.url);
}

run();
