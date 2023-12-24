const express = require('express')
const {
    createBag,
    getBag,
    deleteBag,
    updateBag,
    getOneBag,
    getBestSeller,
    deleteAllBag,
} = require('../controller/bagController')

const checkLogin = require('../middleware/checkLogin.js')

const router = express.Router()

router.post('/create', checkLogin, createBag)
router.get('/get', getBag)
router.get('/getone/:idBag', getOneBag)
router.get('/getBestSeller', getBestSeller)
router.delete('/delete/:idBag', deleteBag)
router.delete('/deleteAll', deleteAllBag)
router.put('/update/:idBag', checkLogin, updateBag)

module.exports = router
