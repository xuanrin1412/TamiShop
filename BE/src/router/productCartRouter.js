const express = require('express')
const {
    addToCart,
    getAllCartItem,
} = require('../controller/productCartController.js')

const checkLogin = require('../middleware/checkLogin.js')

const router = express.Router()

// THEM SAM PHAM VAO GIO HANG
router.post('/addToCart', checkLogin, addToCart)
router.get('/getAllCartItem', checkLogin, getAllCartItem)
module.exports = router
