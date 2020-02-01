const express = require("express");

const router = express.Router();

module.exports = (param) => {

    router.get("/", (req, res, next) => {
        return res.render("feedback");
    });

    router.post("/", (req, res, next) => {
        return res.send("form sent");
    });

    return router;
};