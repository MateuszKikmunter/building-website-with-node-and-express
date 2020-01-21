const express = require("express");
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
app.listen(3000);

module.export = app;