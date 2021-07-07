const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const restJson = require('./restaurant.json');
const RestaurantList = require('../restaurant.js');
const db = require('../../config/mongoose');
const User = require('../user');

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: 'root' 
}

db.once('open', () => {
  bcrypt
  .genSalt(10)
  .then(salt => bcrypt.hash(SEED_USER.password, salt))
  .then(hash => User.create({
    name: SEED_USER.name,
    email: SEED_USER.email,
    password: hash
  }))
  .then(user => {
    const userId = user._id
    return Promise.all(Array.from(
      { length: restJson.results.length },
      (_, i) =>  RestaurantList.create({
      name: restJson.results[i].name,
      name_en: restJson.results[i].name_en,
      category: restJson.results[i].category,
      image: restJson.results[i].image,
      location: restJson.results[i].location,
      phone: restJson.results[i].phone,
      google_map: restJson.results[i].google_map,
      rating: restJson.results[i].rating,
      description: restJson.results[i].description,
      userId
     })
    ))
  })
  .then(() =>{
    console.log('done.')
    process.exit()
  })
})
     
