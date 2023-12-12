const jwt = require('jsonwebtoken')
const checklogin = (req, res, next) => {
    console.log('====================== check login')
    const tokenCheckLogin = req.cookies.tokenJWT
    // console.log('tokenCheckLogin', tokenCheckLogin)

    if (tokenCheckLogin) {
        const decode = jwt.verify(tokenCheckLogin, 'xuanrin')
        //console.log('decode', decode)
        req.user = decode
        next()
    } else {
        return res.json({ message: "You haven't login", result: [] })
    }
}
module.exports = checklogin
