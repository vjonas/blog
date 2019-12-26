const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exec = require("child_process").exec;
const port = 3000;
const hook = { id: 1, name: "hook1", date: new Date().toDateString() };

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("blog-posts.json");
const db = low(adapter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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

app.get("/blogs", (req, res) => {
  console.log("blogs GET request");
  const blogs = db.get("blogs");

  return res.json(blogs);
});

app.post("/blogs", (req, res) => {
  console.log("blogs post request");

  const post = req.body;

  return db
    .get("blogs")
    .find({ id: post.id })
    .assign({ body: post.body })
    .write();
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
