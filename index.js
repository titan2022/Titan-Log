const express = require("express");
const fs = require("fs");

const app = express();

const publicdir = __dirname + "/template";
app.use(express.static(publicdir, {extensions:["html"]}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))