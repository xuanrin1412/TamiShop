const express = require('express')
const { loginUser, logoutUser } = require('../controller/loginController')

const router = express.Router()

router.post('/', loginUser)
router.delete('/', logoutUser)

module.exports = router
