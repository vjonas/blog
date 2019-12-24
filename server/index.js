const express = require("express");
const bodyParser = require("body-parser");
const exec = require("child_process").exec;

const app = express();
const port = 3000;

const hook = { id: 1, name: "hook1", date: new Date().toDateString() };

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/hook", (req, res) => {
  if (
    req.body.pusher &&
    req.body.pusher.name === "vjonas" &&
    req.body.ref.includes("master")
  ) {
    deployApp();
    return res.json(req.body);
  }
  return res.send("Can not deploy");
});

app.get("/hook", (req, res) => {
  return res.json(hook);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

const deployApp = () => {
  console.log("DEPLOYING");

  exec("~/git/blog/server/test.sh", (error, stdout, stderr) => {
    console.log("stdout", stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
};
