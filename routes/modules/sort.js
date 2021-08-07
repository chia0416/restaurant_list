const express = require('express')

const router = express.Router()

const RestaurantList = require('../../models/restaurant')

router.get('/:type/:method', (req, res) => {
  const userId = req.user._id
  const type = req.params.type
  const method = req.params.method

  return RestaurantList.find({userId})
    .collation({locale:'en',strength: 2})
    .sort({ [type]: [method] })
    .lean()
    .then((restaurantLists) => res.render('index', { restaurantLists }))
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router
