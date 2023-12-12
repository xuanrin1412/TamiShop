const { where } = require('sequelize')
const db = require('../models/index')
const jwt = require('jsonwebtoken')

// LOGIN USER
const loginUser = async (req, res) => {
    const { email, password } = req.body

    const userD = await db.User.findOne({ where: { email: email } })

    if (userD) {
        if (userD.password == password) {
            // TẠO TOKEN VỚI THÔNG TIN PAYLOAD
            var tokenJWT = jwt.sign(
                {
                    email: email,
                    userName: userD.userName,
                    admin: userD.admin,
                },
                'xuanrin',
            )
            // GỬI tokenJWT VỀ NGƯỜI DÙNG BẰNG CÁCH ĐẶT NÓ TRONG COOKIE
            console.log('', tokenJWT)
            res.cookie('tokenJWT', tokenJWT)

            res.status(200).json({ message: 'Login successful' })
            console.log('Login Success')
        } else {
            res.status(500).json({
                message: 'Fail to Login Check your password',
            })
        }
    } else {
        res.status(500).json({ message: 'User does not exis' })
    }
}

//LOGOUT
const logoutUser = async (req, res) => {
    const deleteJWT = await res.clearCookie('tokenJWT')
    if (deleteJWT) {
        res.json({ message: 'Logout Success' })
    } else {
        res.json({ message: 'Logout Defeat' })
    }
}

module.exports = { loginUser, logoutUser }
