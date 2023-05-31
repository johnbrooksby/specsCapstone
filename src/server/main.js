const express = require("express");
const ViteExpress = require("vite-express");
require('dotenv').config()
const {PORT} = process.env
const cors = require("cors")
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {billingInfo} = require('./models/billing')
const {isAuthenticated} = require("./middleware/isAuthenticated")
const {register, login, users} = require("./controllers/Auth")

const app = express();

app.use(express.json())
app.use(cors())

User.hasMany(billingInfo)
billingInfo.belongsTo(User)

app.post('/register', register)
app.post('/login', login)
app.get('/admin', users)

// sequelize.sync({force:true})
sequelize.sync()

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
