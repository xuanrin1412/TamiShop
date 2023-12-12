const { where } = require('sequelize')
const db = require('../models/index')

// CREATE USER
const createUser = async (req, res) => {
    const { userName } = req.body
    const { email } = req.body
    const { password } = req.body
    console.log(userName, email, password)
    try {
        const newUser = await db.User.create({ userName, email, password })
        res.json({ newUser })
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

// GET ALL USER
const getUser = async (req, res) => {
    try {
        const getUser = await db.User.findAll()
        res.json({ getUser })
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

// //GET ONE USRE
// const getOneUser = async (rep, res) => {
//     try {
//         const getOneUser = await db.User.findOne
//     } catch (error) {
//         res.status(500).json({ error })
//     }
// }

//DELETE USER
const deleteUser = async (req, res) => {
    try {
        const deleteUser = await db.User.destroy({
            where: {
                id: req.params.idUser,
            },
        })
        res.status(200).json({ messenger: 'User has been deleted !' })
        console.log(deleteUser)
    } catch (error) {
        res.status(500).json({ error })
    }
}

// UPDATE USER
const updateUser = async (req, res) => {
    const { userName, email, password, admin } = req.body
    try {
        const updateUser = await db.User.update(
            {
                userName,
                email,
                password,
                admin,
            },
            {
                where: {
                    id: req.params.idUser,
                },
                new: true,
            },
        )
        res.status(200).json({ messenger: 'Updated User!' })
        console.log(updateUser)
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}

module.exports = { createUser, getUser, deleteUser, updateUser }
