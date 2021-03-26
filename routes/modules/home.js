const express = require("express");

const router = express.Router();

const RestaurantList = require("../../models/restaurant");

//show index
router.get("/", (req, res) => {
  RestaurantList.find()
    .lean()
    .then((restaurantLists) => res.render("index", { restaurantLists }))
    .catch((error) => console.log(error));
});

//搜尋
router.get("/search", (req, res) => {
  const keyword = req.query.keyword;

  return RestaurantList.find({
    name: { $regex: keyword, $options: "i" },
  })
    .lean()
    .then((restaurantLists) => res.render("index", { restaurantLists }))
    .catch((error) => console.log(error));
});

module.exports = router;
