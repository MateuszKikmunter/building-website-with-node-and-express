const express = require("express");

const router = express.Router();

module.exports = (param) => {

    const { feedbackService } = param;

    router.get("/", async (req, res, next) => {
        try {
            const feedbackList = await feedbackService.getList();
            return res.render("feedback", {
                page: "Feedback",
                feedbackList
            });
        } catch (error) {
            return next(error);
        }

    });

    router.post("/", (req, res, next) => {
        return res.send("form sent");
    });

    return router;
};