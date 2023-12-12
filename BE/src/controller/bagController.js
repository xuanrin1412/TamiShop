const { where } = require('sequelize')
const db = require('../models/index')

// CREATE BAG
const createBag = async (req, res) => {
    const { title } = req.body
    const { price } = req.body
    const { des } = req.body
    const { colorimg } = req.body
    const { bestseller } = req.body

    const isAdmin = req.user.admin

    if (isAdmin == true) {
        try {
            const newBag = await db.Bag.create({
                title,
                price,
                des,
                colorimg,
                bestseller,
            })

            res.json({ newBag })
        } catch (error) {
            res.status(500).json({ error })
            console.log(error)
        }
    } else {
        res.status(500).json({ message: "You are't admin" })
    }
}

// GET BAG
const getBag = async (req, res) => {
    try {
        const getBag = await db.Bag.findAll()
        res.json({ getBag })
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

//GET ONE BAG
const getOneBag = async (req, res) => {
    try {
        const getOneBag = await db.Bag.findOne({
            where: {
                id: req.params.idBag,
            },
        })
        res.status(200).json({ getOneBag })
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

//DELETE BAG
const deleteBag = async (req, res) => {
    try {
        const deleteBag = await db.Bag.destroy({
            where: {
                id: req.params.idBag,
            },
        })
        res.status(200).json({ message: 'Bag has been deleted' })
        console.log(deleteBag)
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}
//DELETE All BAG
const deleteAllBag = async (req, res) => {
    try {
        const deleteAllBag = await db.Bag.destroy({ where: {} })
        res.status(200).json({ message: 'Delete All !!' })
        console.log(deleteAllBag)
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

//UPDATE BAG
const updateBag = async (req, res) => {
    const { title, price, des, colorimg } = req.body
    const isAdmin = req.user.admin
    if (isAdmin == true) {
        try {
            const updateBag = await db.Bag.update(
                {
                    title,
                    price,
                    des,
                    colorimg,
                },
                {
                    where: {
                        id: req.params.idBag,
                    },
                    returning: true,
                },
            )
            res.status(200).json({ message: 'Updated !' })
            console.log(updateBag)
        } catch (error) {
            res.status(500).json({ error })
            console.log(error)
        }
    } else {
        res.status(500).json({ message: "You are't admin" })
    }
}
module.exports = {
    createBag,
    getBag,
    deleteBag,
    updateBag,
    getOneBag,
    deleteAllBag,
}
