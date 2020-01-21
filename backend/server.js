const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.static("./assets"));
app.get("/favicon.ico", (req, rest, next) => {
    return rest.sendStatus(204);
});

app.use("/", routes());
app.listen(3000);

module.export = app;