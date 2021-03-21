const express = require("express");
const exphbs = require("express-handlebars");
const RestaurantList = require("./models/restaurant");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true}) )

mongoose.connect("mongodb://localhost/restaurant-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log("mongodb connected!");
})

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

//show index
app.get("/", (req, res) => {
  RestaurantList.find()
  .lean()
  .then(restaurantLists => res.render('index', { restaurantLists }))
  .catch(error => console.log(error))
});

//show detail
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
  .lean()
  .then(restaurantList => res.render('show', { restaurantList }))
  .catch(error => console.log(error))

});

//搜尋
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;

  return RestaurantList.find({
    name: { $regex: keyword, $options: "i" },
  })
    .lean()
    .then((restaurantLists) => res.render("index", { restaurantLists }))
    .catch((error) => console.log(error));
});

//新增
app.post('/create', (req, res) => {
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  console.log('created')
  return RestaurantList.create({
    name: name,
    category: category,
    image: image,
    location: location,
    phone: phone,
    google_map: google_map,
    rating: rating,
    description: description
  })
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

//show edit
app.get("/restaurant/edit/:id", (req, res) => {
  const id = req.params.id;
  return RestaurantList.findById(id)
    .lean()
    .then((restaurantList) => res.render("edit", { restaurantList }))
    .catch((error) => console.log(error));
});

//編輯要求
app.post("/restaurants/edit/:id", (req, res) => {
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  const id = req.params.id;
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

//刪除
app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id;
  return RestaurantList.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

app.listen(3000, () => {
  console.log("Express is listening on localhost:3000");
});
