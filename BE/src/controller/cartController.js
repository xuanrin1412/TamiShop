const { where } = require('sequelize')
const db = require('../models/index')

// CREATE BAG
const createCart = async (req, res) => {
    const userId = req.user.id
    console.log('user', userId)
    try {
        const cart = await db.Cart.findOne({
            where: { userId: userId },
        })
        console.log('cart', cart)
        if (!cart) {
            const newCart = await db.Cart.create({ userId })
            return res.json({ messenger: 'Tao cart Thanh Cong', newCart })
        }
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

const getAllCart = async (req, res) => {
    try {
        const getAllCart = await db.Cart.findAll({
            include: {
                model: db.User,
                // attributes: ['email'],
            },
        })
        return res.json({ messenger: 'Tao cart Thanh Cong', getAllCart })
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

const deleteCart = async (req, res) => {
    try {
        const deleteCart = await db.Cart.destroy({
            where: {
                id: req.params.idCart,
            },
        })
        res.status(200).json({ message: 'Cart has been deleted' })
        console.log(deleteCart)
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

module.exports = {
    createCart,
    getAllCart,
    deleteCart,
}
