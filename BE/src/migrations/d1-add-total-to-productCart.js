'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('ProductCarts', 'total', {
            type: Sequelize.INTEGER,
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('ProductCarts', 'total')
    },
}
