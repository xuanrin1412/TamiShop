'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class ProductCart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ProductCart.belongsTo(models.Bag, { foreignKey: 'bagId' })
            ProductCart.belongsTo(models.Cart, { foreignKey: 'cartId' })
        }
    }
    ProductCart.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
            },
            colorimg: {
                type: DataTypes.ARRAY(DataTypes.JSON),
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bagId: {
                type: DataTypes.INTEGER,
                // references: {
                //     model: 'Bag',
                //     key: 'id',
                // },
            },
            cartId: {
                type: DataTypes.INTEGER,
                // references: {
                //     model: 'Cart',
                //     key: 'id',
                // },
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'ProductCart',
        },
    )
    return ProductCart
}
