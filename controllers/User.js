require('dotenv').config();
const db = require('../models');
const { Op } = require("sequelize");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const starterData = require('./data/starter');

const getUserById = async (req, res) => {
  const targetUser = await db.User.findOne({ where: { id: req.user.id } });
  if (targetUser) {
    res.status(200).send(targetUser);
  }
  res.status(404).send();
}

const registerUser = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const targetUser = await db.User.findOne({ where: { username: username }});
  if (targetUser) {
    res.status(400).send({ message: 'Username already taken.'})
  } else {
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    await db.User.create({
      username: username,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    const newUser = await db.User.findOne({ attributes: ['id'], where: { username: username }});
    await db.Account.bulkCreate(starterData.starterAccount(newUser.id));
    await db.Category.bulkCreate(starterData.starterCategory(newUser.id));
    res.status(201).send({ message: 'User created' });
  }  
}

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await db.User.findOne({ where: { username: username } })
  if (!targetUser) {
    res.status(400).send({ message: 'Username or password is wrong.'});
  } else {
    const isCorrectPassword = bcryptjs.compareSync(password, targetUser.password);
    if (isCorrectPassword) {
      const payload = {
        username: targetUser.username,
        firstName: targetUser.firstName,
        lastName: targetUser.lastName,
        id: targetUser.id,
      }
      const token = jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600});
      res.status(200).send({
        token: token,
        message: 'Login successful.'
      })
    } else {
      res.status(400).send({ message: 'Username or password is wrong.'})
    }
  }
}

const updateUserInfo = async (req, res) => {
  const { username, firstName, lastName } = req.body;
  const sameUser = await db.User.findOne({ where: { username: username, id: {[Op.ne]: req.user.id } } });
  if (sameUser) { 
    res.status(400).send({ message: 'Username already taken'});
  } else {
    const newUserInfo = await db.User.findOne({ where: { id: req.user.id } });
    if (username) newUserInfo.username = username;
    if (firstName) newUserInfo.firstName = firstName;
    if (lastName) newUserInfo.lastName = lastName;
    await newUserInfo.save({ fields: ['username', 'firstName', 'lastName'] });
    res.status(200).send({message: `Your profile has been updated.`});
  }
  
  
}

const updateUserPassword = async (req, res) => {
  const { password } = req.body;
  const targetUser = await db.User.findOne({ where: { id: req.user.id } });
  if (targetUser) {
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    targetUser.password = hashedPassword;
    await targetUser.save({ fields: ['password'] });
    res.status(200).send({message: `Your password has been updated.`});
  } else {
    res.status(404).send();
  }
}

const deleteUser = async (req, res) => {
  const targetUser = await db.User.findOne({ where: { id: req.user.id } });
  if (targetUser) {
    await db.User.destroy(
      { where: { id: req.user.id } }
    );
  }
  res.status(404).send();
}

module.exports = {
  getUserById,
  registerUser,
  loginUser,
  updateUserInfo,
  updateUserPassword,
  deleteUser
}