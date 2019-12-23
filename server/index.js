const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const hook = { id: 1, name: "hook1", date: new Date().toDateString() };

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/hook", (req, res) => {
  console.log("hook post req received");
  return res.json(req.body);
});

app.get("/hook", (req, res) => {
  return res.json(hook);
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
