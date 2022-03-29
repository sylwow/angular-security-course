var jwt = require("jsonwebtoken");
var fs = require("fs");

// verify an existing JWT
var existingToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE2NDg1NTE0NjUsImV4cCI6MTY0ODU1MTU4NSwic3ViIjoiMSJ9.p0MSGPHbQYTmDBAC_pUpWri8unZnutA6Zn9O0-GUHi20Ox_qIKzfTIvJziiTBWr4fMj4_1atqvuw0Nbv5AsoW6mRnQjkwCOkRzu-8eUqgQZd1IxOVQsqffgfx6gtBmiRUa1kHUMI60FpzaJA8iaQwpa-TBLk9oa_tRxCBdQlQ5T1gxLJOAu-CuL3vStvT0aN_zGMqVQyN3la-VtuFYIE4DPljMpj-9DQ7q5GnJb3k5MHIecGpza5WP_LfWoxDx2d9zKY2T3YWUcVMmWulIt1HneP8WS0Hz5Uujy3l7KzYacAEDS2CM9QubGTyGPtA77I7aGfeomAF9Da0fMoyZCkAA";

var publicKey = fs.readFileSync("./demos/public.key");

console.log("verifying");

const verify = jwt.verify(existingToken, publicKey);

console.log("Decoded JWT:", verify);
