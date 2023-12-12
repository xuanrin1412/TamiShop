const express = require('express')
const {
    createBag,
    getBag,
    deleteBag,
    updateBag,
    getOneBag,
} = require('../controller/bagController')

const checkLogin = require('../middleware/checkLogin.js')

const router = express.Router()

router.post('/create', checkLogin, createBag)
router.get('/get', getBag)
router.get('/getone/:idBag', getOneBag)
router.delete('/delete/:idBag', deleteBag)
router.put('/update/:idBag', checkLogin, updateBag)

module.exports = router
