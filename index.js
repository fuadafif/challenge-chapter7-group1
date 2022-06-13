const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

const router = require("./routes");

// request body middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

// running server
app.listen(port, () => console.log("port is running on port " + port));
