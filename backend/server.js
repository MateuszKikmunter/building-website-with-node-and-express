const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.static("./assets"));
app.use("/", routes());
app.listen(3000);

module.export = app;