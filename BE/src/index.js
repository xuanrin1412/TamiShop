const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const bagRouter = require('./router/bagRouter')
const registerRouter = require('./router/registerRouter')
const loginRouter = require('./router/loginRouter')
const cartRouter = require('./router/cartRouter')
const productCartRouter = require('./router/productCartRouter')

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())
app.use(express.json())
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/bag', bagRouter)
app.use('/cart', cartRouter)
app.use('/product_cart', productCartRouter)

const stripe = require('stripe')(
    'sk_test_51O2BltBMGimvwHpfwLaGyRdtTot5eiFmZyhoVtj2rQxPIbDKjhVleznekZK7gC43bBJkdLHii2hvhqoTAM43Z9y300aIVmFXvJ',
)

console.log('stripe', stripe)

app.use(cors())
app.use(bodyParser.json())

// checkout api
app.post('/api/create-checkout-session', async (req, res) => {
    const { products } = req.body
    console.log(' req.body index', req.body)

    const lineItems = products.map(product => ({
        price_data: {
            currency: 'vnd',
            product_data: {
                name: product.Bag.title, // This is the missing property
                images: [product.img],
            },
            unit_amount: product.price,
        },
        quantity: product.quantity,
    }))
    console.log('lineItems', lineItems)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        billing_address_collection: 'required',
        shipping_address_collection: {
            allowed_countries: ['VN'],
        },
        phone_number_collection: {
            enabled: true,
        },
    })

    res.json({ id: session.id })
})

app.listen(8080, () => {
    console.log('CONNECTED TO BACKEND')
})
