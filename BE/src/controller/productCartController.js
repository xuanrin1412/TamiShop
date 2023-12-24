const { where } = require('sequelize')
const db = require('../models/index')

// ADD TO CART
const addToCart = async (req, res) => {
    try {
        const { bagId, quantity, color, img, total } = req.body
        console.log(
            'bagId, quantity, color, img ',
            bagId,
            quantity,
            color,
            img,
            total,
        )
        const userId = req.user.id
        console.log('userId', userId)

        // TAKE USER'S CART
        const userCart = await db.Cart.findOne({
            where: { userId },
        })
        console.log('userCart', userCart.id)

        // //TAKE BAG FROM ID
        const productBag = await db.Bag.findByPk(bagId)
        console.log('productBag', productBag)

        // CHECK IF PRODUCT ALREADY EXIS IN CART
        const existingProductCart = await db.ProductCart.findOne({
            where: { cartId: userCart.id, bagId: bagId, color: color },
        })
        console.log('existingProductCart', existingProductCart)

        if (existingProductCart) {
            await existingProductCart.update({
                ...existingProductCart,
                quantity: existingProductCart.quantity + quantity,
                total: existingProductCart.price + existingProductCart.quantity,
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
                color: color,
                img: img,
                price: productBag.price,
                total: quantity * productBag.price,
            })
        }

        const updatedCart = await db.ProductCart.findAll({
            where: { cartId: userCart.id },
            include: {
                model: db.Bag,
            },
        })

        res.json({
            message: 'Them gio hang thanh cong',
            cart: updatedCart,
        })
    } catch (error) {
        res.status(500).json({ message: 'Loi he thong', error })
        console.log(error)
    }
}

//DELETE ONE CART ITEM
const deleteCartItem = async (req, res) => {
    try {
        const deleteBag = await db.ProductCart.destroy({
            where: {
                id: req.params.idProductcart,
                color: req.params.idColorProductcart,
            },
        })
        res.status(200).json({ message: 'Cart Product has been deleted' })
        console.log(deleteBag)
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

//INCREASE QUANTITY OF PRODUCT
const increaseProduct = async (req, res) => {
    try {
        const existingCartItem = await db.ProductCart.findOne({
            where: {
                id: req.params.idProductcart,
                color: req.params.idColorProductcart,
            },
        })

        if (!existingCartItem) {
            return res
                .status(404)
                .json({ message: 'Product not found in cart' })
        }
        newQuantity = existingCartItem.quantity + 1

        // Increase the quantity by 1
        await existingCartItem.update({
            quantity: newQuantity,
            total: newQuantity * existingCartItem.price, // Update the total based on the new quantity
        })

        // Optionally, you can return the updated cart to the client
        const updatedCart = await db.ProductCart.findAll({
            where: { cartId: existingCartItem.cartId },
            include: {
                model: db.Bag,
            },
        })

        res.status(200).json({
            message: 'Quantity increased successfully',
            updatedCart,
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error)
    }
}
const decreaseProduct = async (req, res) => {
    try {
        const existingCartItem = await db.ProductCart.findOne({
            where: {
                id: req.params.idProductcart,
                color: req.params.idColorProductcart,
            },
        })

        if (!existingCartItem) {
            return res
                .status(404)
                .json({ message: 'Product not found in cart' })
        }
        const newQuantity = Math.max(existingCartItem.quantity - 1, 1)
        // Increase the quantity by 1
        await existingCartItem.update({
            quantity: newQuantity,
            total: newQuantity * existingCartItem.price, // Update the total based on the new quantity
        })

        // Optionally, you can return the updated cart to the client
        const updatedCart = await db.ProductCart.findAll({
            where: { cartId: existingCartItem.cartId },
            include: {
                model: db.Bag,
            },
        })

        res.status(200).json({
            message: 'Quantity increased successfully',
            updatedCart,
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error)
    }
}

const getAllCartItem = async (req, res) => {
    // const userId = req.user.id
    try {
        const getCart = await db.ProductCart.findAll({
            include: [
                {
                    model: db.Bag,
                },
                {
                    model: db.Cart,
                    // where: {
                    //     userId: userId,
                    // },
                },
            ],
        })
        res.json({ getCart })
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

const getUserCartItem = async (req, res) => {
    const userId = req.user.id
    try {
        const getCart = await db.ProductCart.findAll({
            include: [
                {
                    model: db.Bag,
                },
                {
                    model: db.Cart,
                    where: {
                        userId: userId,
                    },
                },
            ],
            order: [['id', 'ASC']], // Order by ID in ascending order
        })
        res.json({ getCart })
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

const totalAll = async (req, res) => {
    const userId = req.user.id
    try {
        // Retrieve the user's cart items from the database
        const cartItems = await db.ProductCart.findAll({
            include: [
                {
                    model: db.Bag,
                },
                {
                    model: db.Cart,
                    where: {
                        userId: userId,
                    },
                },
            ],
        })

        // Check if the user has any cart items
        if (!cartItems || cartItems.length === 0) {
            return res.json({ totalAll: 0 })
        }

        // Calculate the totalAll by summing the total of each cart item
        const totalAll = cartItems.reduce(
            (total, item) => total + item.total,
            0,
        )

        res.json({ totalAll })
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

module.exports = {
    addToCart,
    getAllCartItem,
    deleteCartItem,
    getUserCartItem,
    totalAll,
    increaseProduct,
    decreaseProduct,
}
