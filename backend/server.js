const express = require("express");
const createError = require("http-errors");
const path = require("path");
const app = express();

app.set("view engine", "pug");
app.set("Views", path.join(__dirname, "./views"));

const routes = require("./routes");

app.use(express.static("./assets"));
app.get("/favicon.ico", (req, rest, next) => {
    return rest.sendStatus(204);
});

app.use("/", routes());

//add 404 route handler
app.use((req, res, next) => {
    return next(createError(404, "File not found"));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500;
    res.locals.status = status;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(status);
    return res.render("not-found");
});

app.listen(3000);

module.export = app;