const fs = require("fs");

exports.myAuth = function(header, originUrl) {
  if (process.env.NODE_ENV) {
    const passwd = fs
      .readFileSync("/home/jonas/git/https-server-blogs/password")
      .toLocaleString();

    console.log("header", header, "event", header["x-github-event"]);

    // github does not need auth header
    if (
      header["x-github-event"] ||
      passwd.toString().trim() === header.auth.toString().trim()
    ) {
      return true;
    }
    // emoji \ reaction endpoint does not need auth
    if (
      header.emoji &&
      header.emoji.toString().trim() === "true" &&
      originUrl.includes("reaction")
    ) {
      return true;
    }
    // all other post calls need auth
    if (!header.auth) {
      return false;
    }

    return false;
  }

  return true;
};
