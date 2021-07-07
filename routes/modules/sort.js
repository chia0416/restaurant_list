const express = require("express");

const router = express.Router();

const RestaurantList = require("../../models/restaurant");

// router.get("/name/asc", (req, res) => {
//   console.log("sort")
//   RestaurantList.find()
//     .lean()
//     .sort({ _id: "asc" }) // 新增這裡：根據 _id 升冪排序
//     .then((restaurantList) => res.render("index", { restaurantList }))
//     .catch((error) => console.error(error));
// });

router.get("/:type/:method", (req, res) => {
  const userId = req.user._id
  const type = req.params.type;
  const method = req.params.method;
  console.log(RestaurantList.name)
  return RestaurantList.findOne(userId)
    .sort({ [type]: [method] })
    .lean()
    .then((restaurantLists) => res.render("index", { restaurantLists }))
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
