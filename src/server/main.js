const express = require("express");
const ViteExpress = require("vite-express");
require('dotenv').config()
const {PORT} = process.env
const path = require('path')
const cors = require("cors")
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {billingInfo} = require('./models/billing')
const {register, login, users, logout} = require("./controllers/Auth")

const app = express();

app.use(express.json())
app.use(cors())

app.use(express.static(path.resolve(__dirname, "../build")))


User.hasMany(billingInfo)
billingInfo.belongsTo(User)

app.post('/register', register)
app.post('/login', login)
app.get('/admin', users)
app.get('/logout', logout)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

// sequelize.sync({force:true})
sequelize.sync()

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
