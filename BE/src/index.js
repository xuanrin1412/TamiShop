const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

const bagRouter = require('./router/bagRouter')
const registerRouter = require('./router/registerRouter')
const loginRouter = require('./router/loginRouter')

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/bag', bagRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.listen(8080, () => {
    console.log('CONNECTED TO BACKEND')
})
