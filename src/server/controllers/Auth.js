require("dotenv").config();
const { SECRET } = process.env;
const { User } = require("../models/user");
const { BillingInfo } = require("../models/billing");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (username, id) => {
  return jwt.sign(
    {
      username,
      id
    },
    SECRET,
    {
      expiresIn: "14 days"
    }
  );
};

let admin = false
let userList

module.exports = {
  register: async (req, res) => {
    try {
      const { username, name, password, email_address, street_address, city, state, zip  } = req.body;
      let foundUser = await User.findOne({ where: { username: username } });
      if (foundUser) {
        res.status(400).send("That username is already in use");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          username: username,
          hashedPass: hash,
          name: name,
          admin: false,
          email_address: email_address,
          street_address: street_address,
          city: city,
          state: state,
          zip: zip,
        });
        console.log(newUser);
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 14;
        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token,
          exp
        });
      }
    } catch (error) {
      console.log("You got an error");
      console.error(error);
      res.sendStatus(400);
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username } });
      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );
        if (isAuthenticated) {
          console.log("datavalues",foundUser.dataValues)
          const token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );
          admin = foundUser.dataValues.admin
          const exp = Date.now() + 1000 * 60 * 60 * 24 * 14;
          res.status(200).send({
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.id,
            admin: foundUser.dataValues.admin,
            token,
            exp,
          });
        } else {
          res.status(400).send("cannot log in");
        }
      } else {
        res.status(400).send("cannot log in");
      }
    } catch (error) {
      console.log("ERROR IN register");
      console.log(error);
      res.sendStatus(400);
    }
  },

  users: async (req,res) => {
    if(admin){
      try{
        userList = await User.findAll()
        // let billingList = await BillingInfo.findAll()
        res.status(200).send(userList)
      }
      catch(error) {
        console.log('Error getting users')
        console.log(error)
        res.sendStatus(400)
      }
    } else {
      res.status(401).send('Unauthorized')
    }
  },

  logout: async (req, res) => {
      admin = false
      userList = null
      console.log(admin, userList, 'logged out')
  }
};
