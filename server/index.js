const dotenv = require("dotenv");
dotenv.config();
var express = require("express");

var { scrapeImages } = require("./scrapeImages.js");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/images", (req, res) => {
  const numImages = parseInt(req.query.numImages) || 50;
  scrapeImages(numImages).then((data) => {
    return res.send(data);
  });
});

app.listen(process.env.PORT, () =>
  console.log("listening on " + process.env.PORT)
);
