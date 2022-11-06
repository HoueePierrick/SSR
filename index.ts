const express = require("express");

const app = express();

app.get("/", (req: any, res: any) => {
  res.send("Welcome to my Deliveroo API");
});

app.listen(3210, () => {
  console.log("server started !");
});
