const express = require('express')
const {
    createBag,
    getBag,
    deleteBag,
    updateBag,
    getOneBag,
} = require('../controller/bagController')

const router = express.Router()

router.post('/create', createBag)
router.get('/get', getBag)
router.get('/getone/:idBag', getOneBag)
router.delete('/delete/:idBag', deleteBag)
router.put('/update/:idBag', updateBag)

module.exports = router
