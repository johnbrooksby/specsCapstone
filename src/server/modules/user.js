const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    User: sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hashedPass: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        email_address: DataTypes.STRING,
        street_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}