'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Bag extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Bag.belongsToMany(models.Cart, {
                foreignKey: { name: 'bagId' },
                through: 'ProductCart',
            })
        }
    }
    Bag.init(
        {
            title: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.INTEGER,
            },
            des: {
                type: DataTypes.STRING,
            },
            colorimg: {
                type: DataTypes.ARRAY(DataTypes.JSON),
            },
            bestseller: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
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
            modelName: 'Bag',
        },
    )
    return Bag
}
