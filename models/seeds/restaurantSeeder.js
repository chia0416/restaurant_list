const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const restJson = require('./restaurant.json').results
const RestaurantList = require('../restaurant.js')
const db = require('../../config/mongoose')
const User = require('../user')

const SEED_USER = [{
  name: 'root1',
  email: 'user1@example.com',
  password: '12345678'
},
{
  name: 'root2',
  email: 'user2@example.com',
  password: '12345678'
}]

db.once('open', () => {
  SEED_USER.forEach((user,index) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: 3 },
          (_, i) => RestaurantList.create({
            name: restJson[i + (index * 3)].name,
            name_en: restJson[i + (index * 3)].name_en,
            category: restJson[i + (index * 3)].category,
            image: restJson[i + (index * 3)].image,
            location: restJson[i + (index * 3)].location,
            phone: restJson[i + (index * 3)].phone,
            google_map: restJson[i + (index * 3)].google_map,
            rating: restJson[i + (index * 3)].rating,
            description: restJson[i + (index * 3)].description,
            userId
          })
        ))
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
      .catch(error => console.log(error))
  })
})
