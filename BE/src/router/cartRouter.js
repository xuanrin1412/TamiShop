const express = require('express')
const {
    // createCart,
    // getAllCart,
    // deleteCart,
    totalAll,
} = require('../controller/cartController.js')

const checkLogin = require('../middleware/checkLogin.js')

const router = express.Router()

// THEM SAM PHAM VAO GIO HANG
// router.post('/create', checkLogin, createCart)
// router.get('/getAll', checkLogin, getAllCart)
// router.delete('/delete/:idCart', deleteCart)
router.get('/totalAll', checkLogin, totalAll)
module.exports = router
