const fs = require("fs");

exports.myAuth = function(header) {
  if (process.env.NODE_ENV) {
    const passwd = fs
      .readFileSync("/home/jonas/git/https-server-blogs/password")
      .toLocaleString();

    console.log("header", header, "event", header["x-github-event"]);

    if (
      header["x-github-event"] ||
      passwd.toString().trim() === header.auth.toString().trim()
    ) {
      return true;
    }
    if (header.emoji && header.emoji.toString().trim() === "true") {
      return true;
    }
    return false;
  }

  return true;
};
