const express = require('express')
const app = express()

const bagRouter = require('./router/bagRouter')

app.use(express.json())
app.use('/bag', bagRouter)

app.listen(8080, () => {
    console.log('CONNECTED TO BACKEND')
})
