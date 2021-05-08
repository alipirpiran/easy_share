const router = require("express").Router();
const files = require("../utils/files");

router.get("/", async (req, res) => {
    const { name } = req.query;

    for (const file of files) {
        if (file.originalname == name) {
            res.type(file.mimetype);
            res.setHeader(
                "Content-disposition",
                "attachment; filename=" + file.originalname
            );
            res.send(file.buffer);
            // files.splice(index, 1);
            return;
        }
    }
    res.send("not found");
});

module.exports = router;
