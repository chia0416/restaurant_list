const express = require('express')

const router = express.Router()

const RestaurantList = require('../../models/restaurant')

// show index
router.get('/', (req, res) => {
  const userId = req.user._id
  RestaurantList.find({ userId })
    .lean()
    .then((restaurantLists) => res.render('index', { restaurantLists }))
    .catch((error) => console.log(error))
})

// 搜尋
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id
  return RestaurantList.find({
    userId,
    $or:[
     { "name": { $regex: keyword, $options: 'i' }},
     { "category": { $regex: keyword, $options: 'i' }}
    ]
  })
    .lean()
    .then((restaurantLists) => res.render('index', { restaurantLists }))
    .catch((error) => console.log(error))
})

module.exports = router
