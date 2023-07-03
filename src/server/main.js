const ViteExpress = require("vite-express");
const express = require('express');
require('dotenv').config()
const path = require('path')
const cors = require("cors")
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {BillingInfo} = require('./models/billing')
const {PORT} = process.env
const {register, login, usersAdmin, logout, billing, addbill, account} = require("./controllers/Auth")
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const app = express();

app.use(express.json())
app.use(cors())

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:5556';


// app.use(express.static(path.resolve(__dirname, "../dist")))

User.hasMany(BillingInfo)
BillingInfo.belongsTo(User)

app.post('/register', register)
app.post('/login', login)
app.get('/admin', usersAdmin)
app.put('/logout', logout)
app.post('/billing', billing)
app.post("/addbill", addbill)
app.post('/account', account)
// app.post('/v1/checkout/sessions') 
// app.post('/v1/checkout/sessions/:id/expire')
// app.get('/v1/checkout/sessions/:id')
// app.get('/v1/checkout/sessions')
// app.get('/v1/checkout/sessions/:id/line_items')
// app.post('/create-checkout-session', async (req, res) => {
//   let price1 = 50
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: price1,
//         quantity: 1,
//       },
//     ],
//     mode: 'subscription',
//     success_url: `${YOUR_DOMAIN}/success.html`,
//     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//   });

//   res.redirect(303, session.url);
// });

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '../build', 'index.html'))
// })

// sequelize.sync({force:true})
sequelize.sync()

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
