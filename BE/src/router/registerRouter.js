const express = require('express')
const {
    createUser,
    getUser,
    deleteUser,
    updateUser,
} = require('../controller/registerController')

const router = express.Router()

router.post('/', createUser)
router.get('/', getUser)
router.delete('/delete/:idUser', deleteUser)
router.put('/update/:idUser', updateUser)

module.exports = router
