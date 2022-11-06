const express = require("express");
const app = express();
const axios = require("axios");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.get("/", (req: any, res: any) => {
  res.send("Welcome to my Deliveroo API");
});

app.get("/restaurants", async (req: any, res: any) => {
  const { data } = await axios.get(
    "https://deliveroo.fr/fr/restaurants/paris/paris-10eme-gare-de-lest?fulfillment_method=DELIVERY&geohash=u09wjdrgxfem"
  );
  const dom = new JSDOM(data);
  const obj = dom.window.document.querySelector("#__NEXT_DATA__").textContent;
  //   const {} = obj.props.initialState.home.feed.results.data;
  res.json(JSON.parse(obj.props));
});

app.listen(3210, () => {
  console.log("server started !");
});
