const express = require("express");

const router = express.Router();

module.exports = (param) => {

    const { feedbackService } = param;

    router.get("/", async (req, res, next) => {
        try {
            const feedbackList = await feedbackService.getList();
            return res.render("feedback", {
                page: "Feedback",
                feedbackList,
                success: req.query.success
            });
        } catch (error) {
            return next(error);
        }

    });

    router.post("/", async (req, res, next) => {
        const fbName = req.body.fbName.trim();
        const fbTitle = req.body.fbTitle.trim();
        const fbMessage = req.body.fbMessage.trim();

        try {
            if (!fbName || !fbTitle || !fbMessage) {
                const feedbackList = await feedbackService.getList();
                return res.render("feedback", {
                    page: "Feedback",
                    error: true,
                    fbName,
                    fbMessage,
                    fbTitle,
                    feedbackList
                });
            }

            await feedbackService.addEntry(fbName, fbTitle, fbMessage);
            return res.redirect("/feedback?success=true");
        } catch (error) {
            return next(error);
        }
    });

    return router;
};