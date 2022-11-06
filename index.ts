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
  //   console.log(JSON.parse(obj).props);
  res.json(
    JSON.parse(obj).props.initialState.home.feed.results.data.filter(
      (e: any) => e.typeName === "UILayoutList"
    )
  );
});

app.get("/restaurant", async (req: any, res: any) => {
  const { data } = await axios.get(
    "https://deliveroo.fr/fr/menu/Paris/10eme-gare-du-nord/paris-10e/?day=today&geohash=u09wjdrgxf0p&time=ASAP"
  );
  const dom = new JSDOM(data);
  const obj = dom.window.document.querySelector("#__NEXT_DATA__").textContent;
  //   const { restaurant, menu } = JSON.parse(obj);
  const restaurant =
    JSON.parse(obj).props.initialState.menuPage.menu.meta.restaurant;
  const items = JSON.parse(obj).props.initialState.menuPage.menu.meta.items;
  const categories =
    JSON.parse(obj).props.initialState.menuPage.menu.meta.categories;

  res.json({ restaurant, categories, items });
  //   res.json(JSON.parse(obj).props.initialState.menuPage.menu);
});

app.listen(3210, () => {
  console.log("server started !");
});
