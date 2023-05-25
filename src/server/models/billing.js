const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    billingInfo: sequelize.define("billingInfo", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        charge_explanation: {
            type: DataTypes.TEXT,
            // allowNull: false
        },
        amount_due: {
            type: DataTypes.STRING,
            // allowNull: false
        }
    })
}