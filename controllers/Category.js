require('dotenv').config();
const { sequelize } = require('../models');
const db = require('../models');
const { Op } = require("sequelize");
const TransactionDate = require('../models/TransactionDate');
const TransactionRecord = require('../models/TransactionRecord');

// helper method

const getCategorySummary = async (startDate, endDate, userId, field) => {
  const dateIdsArray = [];
  await db.TransactionDate.findAll({
    where: { date: { [Op.between]: [startDate, endDate] }}
  }).then(result => { 
    for (let i = 0; i < result.length; i++) {
      dateIdsArray.push(result[i].id);
    }
  })
  let attributesStatement = [];
  if (field === 'expense') {
    attributesStatement = [[sequelize.fn('sum', sequelize.col('withdrawal')), 'amount']]
  } else if (field === 'income') {
    attributesStatement = [[sequelize.fn('sum', sequelize.col('deposit')), 'amount']]
  }
  const categoriesList = await db.Category.findAll({
    where: { type: field, user_id: userId },
    include: { 
      attributes: attributesStatement,
      model: db.TransactionRecord,
      as: 'Amount',
      where: { date_id: dateIdsArray, type: field, user_id: userId }
    }
  })
  return categoriesList;
}

// route method

const getExpenseCategoryBetween = async (req, res) => {
  const { startDate, endDate } = req.body;
  const targetCategories = await getCategorySummary(startDate, endDate, req.user.id, 'expense');
  if (targetCategories) {
    res.status(200).send(targetCategories);
  }
  res.status(404).send();
}

const getIncomeCategoryBetween = async (req, res) => {
  const { startDate, endDate } = req.body;
  const targetCategories = await getCategorySummary(startDate, endDate, req.user.id, 'income');
  if (targetCategories) {
    res.status(200).send(targetCategories);
  }
  res.status(404).send();
}

const getAllCategory = async (req, res) => {
  const targetCategory = await db.Category.findAll({ where: { user_id: req.user.id } });
  if (targetCategory) {
    res.status(200).send(targetCategory);
  }
  res.status(404).send();
}

const addCategory = async (req, res) => {
  const { name, type } = req.body;
  const sameCategory = await db.Category.findOne({ where: { name: name, user_id: req.user.id } });
  if (sameCategory) {
    res.status(400).send({ message: 'Category name is duplicate.' });
  } else {
    const newCategory = await db.Category.create({
      name: name,
      type: type,
      user_id: req.user.id,
    });
    res.status(201).send(newCategory);
  }
}

const updateCategoryById = async (req, res) => {
  const categoryId = Number(req.params.id);
  const { name } = req.body;
  const sameCategory = await db.Category.findOne({ where: { name: name, user_id: req.user.id } });
  if (sameCategory) {
    res.status(400).send({ message: 'Category name is duplicate.' });
  } else {
    const targetCategory = await db.Category.findOne({ where: { id: categoryId, user_id: req.user.id } });
    if (targetCategory) {
      if (name) targetCategory.name = name;
      await targetCategory.save({ fields: ['name'] });
      res.status(200).send({ message: `Your category has been updated.` });
    } else {
      res.status(400).send({ message: 'Category not found.' });
    }
  }
}

const deleteCategoryById = async (req, res) => {
  const categoryId = Number(req.params.id);
  const targetCategory = await db.Category.findOne({ where: { id: categoryId, user_id: req.user.id } });
  if (targetCategory) {
    await db.Category.destroy(
      { where: { id: categoryId, user_id: req.user.id } }
    );
  }
  res.status(404).send();
}

module.exports = {
  getExpenseCategoryBetween,
  getIncomeCategoryBetween,
  getAllCategory,
  addCategory,
  updateCategoryById,
  deleteCategoryById
}