const express = require('express')
const {
    addToCart,
    getAllCartItem,
    deleteCartItem,
    getUserCartItem,
    increaseProduct,
    totalAll,
    decreaseProduct,
    deleteAllCartItem,
} = require('../controller/productCartController.js')

const checkLogin = require('../middleware/checkLogin.js')

const router = express.Router()

// THEM SAM PHAM VAO GIO HANG
router.post('/addToCart', checkLogin, addToCart)
router.get('/getAllCartItem', checkLogin, getAllCartItem)
router.delete('/delete/:idProductcart/:idColorProductcart', deleteCartItem)
router.delete('/deleteAll', checkLogin, deleteAllCartItem)
router.put(
    '/increaseProduct/:idProductcart/:idColorProductcart',
    increaseProduct,
)
router.put(
    '/decreaseProduct/:idProductcart/:idColorProductcart',
    decreaseProduct,
)
router.get('/getUserCartItem/', checkLogin, getUserCartItem)
// router.post('/totalAll', checkLogin, totalAll)
module.exports = router
