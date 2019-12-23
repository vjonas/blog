const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/hook", (req, res) => {
  return res.json(req.body);
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
