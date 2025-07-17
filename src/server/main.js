const ViteExpress = require("vite-express");
const express = require('express');
require('dotenv').config()
// const path = require('path')
const cors = require("cors")
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {BillingInfo} = require('./models/billing')
const {UserBackup} = require('./models/userBackup')
const {BillingInfoBackup} = require('./models/billingBackup')
const {PORT} = process.env
const {register, login, usersAdmin, logout, billing, addbill, account, markaspaid, deleteuser, editUser} = require("./controllers/Auth")

const app = express();

app.use(express.json())
app.use(cors())

const YOUR_DOMAIN = 'http://localhost:5556';

User.hasMany(BillingInfo)
BillingInfo.belongsTo(User)
UserBackup.hasMany(BillingInfoBackup)
BillingInfoBackup.belongsTo(UserBackup)

app.post('/api/register', register)
app.post('/api/login', login)
app.get('/api/admin', usersAdmin)
app.put('/api/logout', logout)
app.post('/api/billing', billing)
app.post('/api/addbill', addbill)
app.post('/api/account', account)
app.put('/api/markaspaid', markaspaid)
app.delete('/api/deleteuser/:client', deleteuser)
app.put('/api/editUser', editUser)

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
// })

// sequelize.sync({force:true})
sequelize.sync()

// app.listen(PORT, () =>
ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
