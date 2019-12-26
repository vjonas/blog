const fs = require("fs");
// const passwd = fs
//   .readFileSync("/Users/jonasvercammen/password")
//   .toLocaleString();

exports.myAuth = function(header) {
  console.log("LOGGED", header, `heaer:${header.auth}`);
  if (process.env.NODE_ENV) {
    const passwd = fs.readFileSync(
      "/home/jonas/git/https-server-blogs/password"
    );
    if (passwd === header.auth) {
      return true;
    }
    return false;
  }

  return true;
};
