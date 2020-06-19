const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
const chalk = require("chalk");
const helmet = require("helmet");
const cors = require("cors");
const axios = require("axios");
var fs = require("fs");
const appRouters = require("./server/routes");
// Securing the express layer
app.use(helmet());
app.use(compression());
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

// Body parser middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Server route handlers
app.use(appRouters);
app.get("*", function (req, res) {
  fs.readFile(__dirname + "/client/build/index.html", "utf8", function (
    err,
    text
  ) {
    console.log(err);
    console.log(text);
    res.send(text);
  });
});
const serverInstance = app.listen("5070", () =>
  console.log(__dirname, chalk.green(`Listening on port 5070`))
);
//serverInstance.keepAliveTimeout = 60000 * 2;
