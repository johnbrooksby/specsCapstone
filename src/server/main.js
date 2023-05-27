const express = require("express");
const ViteExpress = require("vite-express");
require('dotenv').config()
const {PORT} = process.env
const cors = require("cors")
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {billingInfo} = require('./models/billing')

// const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require("./controllers/Posts")
// const {isAuthenticated} = require("./middleware/isAuthenticated")
const {register, login} = require("./controllers/Auth")

const app = express();

app.use(express.json())

User.hasMany(billingInfo)
billingInfo.belongsTo(User)

app.post('/register', register)
app.post('/login', login)

// sequelize.sync({force:true})
sequelize.sync()

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
