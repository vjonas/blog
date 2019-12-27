const fs = require("fs");

exports.myAuth = function(header) {
  if (process.env.NODE_ENV) {
    const passwd = fs
      .readFileSync("/home/jonas/git/https-server-blogs/password")
      .toLocaleString();

    if (
      header.X - GitHub - Event ||
      passwd.toString().trim() === header.auth.toString().trim()
    ) {
      return true;
    }
    return false;
  }

  return true;
};
