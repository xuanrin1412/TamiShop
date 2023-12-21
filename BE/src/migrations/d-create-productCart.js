'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ProductCarts', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
            },
            colorimg: {
                type: Sequelize.ARRAY(Sequelize.JSON),
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            bagId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'Bags',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            cartId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'Carts', // Tên bảng bạn muốn tham chiếu
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ProductCarts')
    },
}
