const restJson = require('./restaurant.json');
const RestaurantList = require('../restaurant.js');

const db = require('../../config/mongoose');

db.once('open', () => {
  console.log('connected!');
  for (let i = 0; i < restJson.results.length; i++) {
    RestaurantList.create({
      name: restJson.results[i].name,
      name_en: restJson.results[i].name_en,
      category: restJson.results[i].category,
      image: restJson.results[i].image,
      location: restJson.results[i].location,
      phone: restJson.results[i].phone,
      google_map: restJson.results[i].google_map,
      rating: restJson.results[i].rating,
      description: restJson.results[i].description,
    });
  }
  console.log('done!');
});

