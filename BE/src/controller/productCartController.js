const { where } = require('sequelize')
const db = require('../models/index')

// ADD TO CART
const addToCart = async (req, res) => {
    try {
        const { bagId } = req.body
        const { quantity } = req.body
        console.log('idbag , quantity', bagId, quantity)
        const userId = req.user.id
        console.log('userId', userId)

        // TAKE USER CART
        const userCart = await db.Cart.findOne({
            where: { userId },
        })
        console.log('userCart', userCart.id)

        // //TAKE BAG FROM ID
        const productBag = await db.Bag.findByPk(bagId)
        console.log('productBag', productBag)

        // CHECK IF PRODUCT ALREADY EXIS IN CART
        const existingProductCart = await db.ProductCart.findOne({
            where: { cartId: userCart.id, bagId: bagId },
        })
        console.log('existingProductCart', existingProductCart)

        if (existingProductCart) {
            await existingProductCart.update({
                quantity: (existingProductCart.quantity += quantity),
            })
            console.log(
                ' existingProductCart.quantity',
                existingProductCart.quantity,
            )
        } else {
            // Create a new product cart entry
            await db.ProductCart.create({
                cartId: userCart.id,
                bagId: bagId,
                quantity: quantity,
                // price: productBag.price,
                // colorimg: productBag.colorimg,
            })
            console.log('ProductCart after add', db.ProductCart)
        }

        res.json({ messenger: 'add succesfull' })
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

//DELETE ONE CART ITEM
const deleteCartItem = async (req, res) => {
    try {
        const deleteBag = await db.ProductCart.destroy({
            where: {
                id: req.params.idProductcart,
            },
        })
        res.status(200).json({ message: 'Cart item has been deleted' })
        console.log(deleteBag)
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}
const getAllCartItem = async (req, res) => {
    try {
        const getCart = await db.ProductCart.findAll({
            include: {
                model: db.Bag,
                // attributes: ['email'],
            },
        })
        res.json({ getCart })
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

module.exports = {
    addToCart,
    getAllCartItem,
    deleteCartItem,
}
