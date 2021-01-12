require('dotenv').config();
const db = require('../models');
const { sequelize } = require('../models');

const getAllAccount = async (req, res) => {
  const targetAccount = await db.Account.findAll({ where: { user_id: req.user.id } });
  if (targetAccount) {
    res.status(200).send(targetAccount);
  }
  res.status(404).send();
}

const addAccount = async (req, res) => {
  const { name, type } = req.body;
  const targetAccount = await db.Account.findOne({ where: { name: name, user_id: req.user.id } });
  if (targetAccount) {
    res.status(400).send({ message: 'Account name is duplicate.'});
  } else {
    const newAccount = await db.Account.create({
      name: name,
      type: type,
      user_id: req.user.id,
    });
    res.status(201).send(newAccount);
  }
}

const updateAccountById = async (req, res) => {
  const accountId = Number(req.params.id);
  const { name, type } = req.body;
  const sameAccount = await db.Account.findOne({ where: { name: name, user_id: req.user.id } });
  const targetAccount = await db.Account.findOne({ where: { id: accountId, user_id: req.user.id } });
  if (sameAccount) {
    res.status(400).send({ message: 'Account name is duplicate.'});
  } else if (targetAccount ) {
    if (name) targetAccount.name = name;
    if (type) targetAccount.type = type;
    await targetAccount.save({ fields: ['name', 'type'] });
    res.status(200).send({message: `Your account has been updated.`});
  } else {
    res.status(400).send({ message: 'Account not found.'});
  } 
}
const updateAccountBalance = async (req, res) => {
  const accountId = Number(req.params.id);
  const targetAccount = await db.Account.findOne({
    where: { id: accountId, user_id: req.user.id }
  });
  if (targetAccount) {
    let expense = await db.TransactionRecord.findAll({
      attributes: [[sequelize.fn('sum', sequelize.col('withdrawal')), 'totalExpense']],
      where: {
        sender_id: accountId,
        user_id: req.user.id,
      },
      raw: true
    }).then(result => {
      return result[0];
    }).then(data => {
      return JSON.stringify(data['totalExpense']);
    }).catch(err => {
      console.log(err);
    });
    let income = await db.TransactionRecord.findAll({
      attributes: [[sequelize.fn('sum', sequelize.col('deposit')), 'totalIncome']],
      where: {
        receiver_id: accountId,
        user_id: req.user.id,
      },
      raw: true
    }).then(result => {
      return result[0];
    }).then(data => {
      return JSON.stringify(data['totalIncome']);
    }).catch(err => {
      console.log(err);
    });
    if (expense === 'null') expense = 0;
    if (income === 'null') income = 0;
    targetAccount.balance = income - expense;
    await targetAccount.save({ fields: ['balance'] });
    res.status(200).send({ message: `Your account balance has been updated.` });
    return income;
  } else {
    res.status(404).send();
  }
}

const deleteAccountById = async (req, res) => {
  const accountId = Number(req.params.id);
  const targetAccount = await db.Account.findOne({ where: { id: accountId, user_id: req.user.id } });
  if (targetAccount) {
    await db.Account.destroy(
      { where: { id: accountId, user_id: req.user.id } }
    );
  }
  res.status(404).send();
}

module.exports = {
  getAllAccount,
  addAccount,
  updateAccountById,
  updateAccountBalance,
  deleteAccountById,
}