const express = require("express");
const exphbs = require("express-handlebars");
const RestaurantList = require("./models/restaurant");
const mongoose = require('mongoose');

const app = express();

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

app.get("/", (req, res) => {
  RestaurantList.find()
  .lean()
  .then(restaurantLists => res.render('index', { restaurantLists }))
  .catch(error => console.log(error))
});

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
  .lean()
  .then(restaurantList => res.render('show', { restaurantList }))
  .catch(error => console.log(error))

});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;

  return RestaurantList.find({
    name: { $regex: keyword, $options: "i" },
  })
    .lean()
    .then((restaurantLists) => res.render("index", { restaurantLists }))
    .catch((error) => console.log(error));
});


//此處路由器讀不到 /index.handlebars的modal
app.post('/create', (req, res) => {
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  
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

app.listen(3000, () => {
  console.log("Express is listening on localhost:3000");
});
