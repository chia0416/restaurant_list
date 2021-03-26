const express = require("express");

const router = express.Router();

const RestaurantList = require("../../models/restaurant");

//show detail
router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log('show detail')
  return RestaurantList.findById(id)
    .lean()
    .then((restaurantList) => res.render("show", { restaurantList }))
    .catch((error) => console.log(error));
});

//show edit
router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  console.log('show edit')
  return RestaurantList.findById(id)
    .lean()
    .then((restaurantList) => res.render("edit", { restaurantList }))
    .catch((error) => console.log(error));
});

//編輯要求
router.put("/edit/:id", (req, res) => {
  const {
    name,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  const id = req.params.id;
  console.log("show edit ask");
  return RestaurantList.findById(id)
    .then((restaurants) => {
      restaurants.name = name;
      restaurants.phone = phone;
      restaurants.category = category;
      restaurants.rating = rating;
      restaurants.location = location;
      restaurants.image = image;
      restaurants.google_map = google_map;
      restaurants.description = description;
      return restaurants.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

//新增
router.post("/create", (req, res) => {
  const {
    name,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  console.log("created");
  return RestaurantList.create({
    name: name,
    category: category,
    image: image,
    location: location,
    phone: phone,
    google_map: google_map,
    rating: rating,
    description: description,
  })
    .then(res.redirect("/"))
    .catch((error) => console.log(error));
});

//刪除
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return RestaurantList.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
