var jwt = require("jsonwebtoken");

// verify an existing JWT
var existingToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE2NDg1NDUzOTh9.hLCrNPvKWKTvVOOhuLc3SWw1lEl_XG-KOg5AaPeBjOM";

var secretKey = "secret-key";

const verify = jwt.verify(existingToken, secretKey);

console.log("Decoded JWT:", verify);
