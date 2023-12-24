'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Carts', 'totalAll', {
            type: Sequelize.INTEGER,
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Carts', 'totalAll')
    },
}
