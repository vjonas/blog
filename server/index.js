const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exec = require("child_process").exec;
const port = 3000;
const hook = { id: 1, name: "hook1", date: new Date().toDateString() };
const https = require("https");
const fs = require("fs");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(
  process.env.NODE_ENV
    ? "./server/blog-posts.json"
    : "./server/blog-posts-test.json"
);
const db = low(adapter);

const { myAuth } = require("./auth");

console.log("process.env:", process.env.NODE_ENV);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, auth, X-GitHub-Event,guid,emoji"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Now using https..");
});

app.post("*", (req, res, next) => {
  console.log("auth middleware");
  myAuth(req.headers, req.originalUrl)
    ? next()
    : res.status(401).json("not authenticated");
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
  console.log("POST /blog:", req.body.id, "\n");
  console.log("req", req.originalUrl);
  const post = req.body;

  const postToFind = db
    .get("blogs")
    .find({ id: post.id })
    .value();

  if (!postToFind) {
    return res.status(400).json("not found");
  }
  db.get("blogs")
    .find({ id: post.id })
    .assign(post)
    .write();

  return res.status(200).json(db.get("blogs").value());
});

app.post("/blogs/reaction", (req, res) => {
  console.log("req", req.originalUrl);
  if (!req.headers.emoji || !req.body || !req.body.id || !req.headers.guid) {
    return res
      .status(500)
      .json("no emoji header || body || blogid || user-guid");
  }
  console.log("POST /blog/reaction:", req.body.id, "\n", req.headers.emoji);
  console.log("is true?", req.headers.emoji.toString().trim() === "true");

  const post = req.body;

  const postToFind = db
    .get("blogs")
    .find({ id: post.id })
    .value();

  if (!postToFind) {
    return res.status(400).json("Could not find post");
  }

  if (!postToFind.votes[post.emojiKey]) {
    return res.status(500).json("Reaction does not exist");
  }

  db.get("blogs")
    .find({ id: post.id })
    .assign({
      votes: {
        ...postToFind.votes,
        [post.emojiKey]: Array.from(
          new Set([...postToFind.votes[post.emojiKey], req.headers.guid])
        )
      }
    })
    .write();

  return res.status(200).json(db.get("blogs").value());
});

app.get("/hook", (req, res) => {
  return res.json(hook);
});

if (process.env.NODE_ENV) {
  const key = fs.readFileSync(
    "/home/jonas/git/https-server-blogs/privkey2.pem"
  );
  const cert = fs.readFileSync("/home/jonas/git/https-server-blogs/cert2.pem");
  const ca = fs.readFileSync("/home/jonas/git/https-server-blogs/chain2.pem");
  const options = {
    key,
    cert,
    ca
  };
  const server = https.createServer(options, app);
  server.listen(port, () => {
    console.log("server starting on port : " + port);
  });
} else {
  app.listen(port, () => console.log(`Listening on port ${port}!`));
}

const deployApp = () => {
  console.log("DEPLOYING");

  exec("/home/jonas/git/blog/server/test.sh", (error, stdout, stderr) => {
    console.log("stdout", stdout);
    console.log(stderr);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
};
