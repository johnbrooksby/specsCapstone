require("dotenv").config();
const { SECRET } = process.env;
const { User } = require("../models/user");
const { BillingInfo } = require("../models/billing");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (username, id, admin) => {
  return jwt.sign(
    {
      username,
      id,
    },
    SECRET,
    {
      expiresIn: "14 days",
    }
  );
};

let admin = false;
let userList;
let billingList;
let userBills;

module.exports = {
  register: async (req, res) => {
    try {
      const {
        username,
        name,
        password,
        email_address,
        street_address,
        city,
        state,
        zip,
      } = req.body;
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
        const newBill = await BillingInfo.create({
          userId: newUser.id,
          charge_explanation: "Initial Consultation",
          amount_due: 0,
          paid: true,
        });
        console.log(newUser);
        console.log(newBill);
        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 14;
        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token,
          admin,
          exp,
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
          console.log("datavalues", foundUser.dataValues);
          const token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );
          admin = foundUser.dataValues.admin;
          const exp = Date.now() + 1000 * 60 * 60 * 24 * 14;
          res.status(200).send({
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.id,
            email_address: foundUser.dataValues.email_address,
            street_address: foundUser.dataValues.street_address,
            city: foundUser.dataValues.city,
            state: foundUser.dataValues.state,
            zip: foundUser.dataValues.zip,
            admin,
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

  account: async (req, res) => {
    try {
      userBills = await User.findOne({
        where: { id: req.body.userId },
        attributes: [
          "name",
          "email_address",
          "street_address",
          "city",
          "state",
          "zip",
          "id",
        ],
        include: {
          model: BillingInfo,
          // where: { paid: false },
        },
        order: [[BillingInfo, "id", "ASC"]],
      });
      res.status(200).send(userBills);
    } catch (error) {
      console.log("Error getting user");
      console.log(error);
      res.sendStatus(400);
    }
  },

  usersAdmin: async (req, res) => {
    if (admin) {
      try {
        userList = await User.findAll({
          where: { admin: false },
          attributes: [
            "name",
            "email_address",
            "street_address",
            "city",
            "state",
            "zip",
            "id",
          ],
          include: [
            {
              model: BillingInfo,
            },
          ],
          order: [[BillingInfo, "id", "ASC"]],
        });
        res.status(200).send(userList);
      } catch (error) {
        console.log("Error getting users");
        console.log(error);
        res.sendStatus(400);
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  },

  billing: async (req, res) => {
    try {
      const { id } = req.body;
      let user = await User.findAll({
        where: { id },
        include: [
          {
            model: BillingInfo,
            required: true,
          },
        ],
        order: [[BillingInfo, 'id', 'DESC']],
        attributes: [
          "name",
          "email_address",
          "street_address",
          "city",
          "state",
          "zip",
          "id",
        ],
      });
      res.status(200).send(user);
    } catch (error) {
      console.log("Error getting users");
      console.error(error);
      res.sendStatus(400);
    }
  },

  addbill: async (req, res) => {
    try {
      const { userid, charge_explanation, amount_due } = req.body;
      let newBill = await BillingInfo.create({
        userId: userid,
        charge_explanation: charge_explanation,
        amount_due: amount_due,
        paid: false,
      });
      res.status(200).send(newBill);
    } catch (error) {
      console.log("Error posting new billing information");
      console.error(error);
      res.sendStatus(400);
    }
  },

  markaspaid: async (req, res) => {
    try {
      const { id, paid } = req.body;
      let markBillAsPaid = await BillingInfo.upsert({
        id: id,
        paid: paid,
      })
      res.status(200).send(markBillAsPaid)
    } catch (error) {
      console.log("Error marking bill as paid");
      console.error(error);
      res.sendStatus(400);
    }
  },

  editUser: async (req, res) => {
    try {
      const {id, client, email, street, city, state, zip} = req.body
      // console.log("Before axios", id, client, email, street, city, state, zip)
      let editUser = await User.update(
        {
          name: client,
          email_address: email,
          street_address: street,
          city: city,
          state: state,
          zip: zip,
        },
        {where: { id: id }})
        // console.log("In axios call", id, client, email, street, city, state, zip)
      // console.log("-----EDIT USER------", editUser)
      res.status(200).send(editUser)
    } catch (error) {
      console.log("Error editing user");
      console.error(error);
      res.sendStatus(400);
    }
  },

  deleteuser: async (req, res) => {
    try {
      const {client} = req.params;
      await BillingInfo.destroy ({ where: { "userId": client } });
      await User.destroy({ where: { id: client } });

    } catch (error) {
      console.log("Error deleting user")
      console.error(error)
      res.sendStatus(400)
    }
  },

  logout: async (req, res) => {
    admin = false;
    userList = null;
    billingList = null;
  },
};
