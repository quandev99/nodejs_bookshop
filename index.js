const express = require("express");
const app = express();
const port = 8888;

app.get("/", (req, res) => {
  var a = 1;
  var b = 1;
  var c = a + b;
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
