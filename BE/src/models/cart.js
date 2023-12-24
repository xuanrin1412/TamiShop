'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Cart.belongsTo(models.User, { foreignKey: { name: 'userId' } })
            Cart.belongsToMany(models.Bag, {
                foreignKey: { name: 'cartId' },
                through: 'ProductCart',
            })
        }
    }
    Cart.init(
        {
            userId: DataTypes.INTEGER,
            totalAll: DataTypes.INTEGER,
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
            modelName: 'Cart',
        },
    )
    return Cart
}
