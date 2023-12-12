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
            // define association here
        }
    }
    Bag.init(
        {
            title: DataTypes.STRING,
            price: DataTypes.INTEGER,
            des: DataTypes.STRING,
            colorimg: DataTypes.ARRAY(DataTypes.JSON),
            bestseller: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Bag',
        },
    )
    return Bag
}
