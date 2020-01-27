const express = require("express");

const router = express.Router();

module.exports = () => {
    router.get("/", (req, res, next) => {
        return res.render("speakers");
;    });

    router.get("/:name", (req, res, next) => {
        return res.send(`Details for ${req.params.name}`);
    });

    return router;
};