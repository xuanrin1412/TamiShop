const { where } = require('sequelize')
const db = require('../models/index')
const { Attribute } = require('@angular/core')

//GET TOTAL ALL OF USER'S CART
const totalAll = async (req, res) => {
    const user = req.user
    const userId = user.id
    try {
        const cart = await db.Cart.findOne({
            where: { userId: userId },
        })
        const cartId = cart.id

        const totalOfEachProduct = await db.ProductCart.findAll({
            where: { cartId: cartId },
        })

        const totalAll = totalOfEachProduct.reduce(
            (acc, product) => acc + product.total,
            0,
        )

        await db.Cart.update(
            { totalAll },
            {
                where: { userId },
            },
        )
        res.status(200).json({ user, totalAll })
    } catch (error) {
        res.status(500).json({ error })
        console.error(error)
    }
}

module.exports = {
    totalAll,
}
