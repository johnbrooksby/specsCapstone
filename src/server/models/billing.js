const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    BillingInfo: sequelize.define("billinginfo", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        charge_explanation: {
            type: DataTypes.TEXT,
        },
        amount_due: {
            type: DataTypes.DECIMAL(10,2)
        },
        paid : {
            type: DataTypes.BOOLEAN
        }
    })
}