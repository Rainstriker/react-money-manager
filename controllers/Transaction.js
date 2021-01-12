require('dotenv').config();
const db = require('../models');
const { Op } = require("sequelize");
const { sequelize } = require('../models');

// helper method

const getTransaction = async (startDate, endDate, userId, fieldId, field) => {
  let whereStatementDate = {};
  let whereStatementRecord = {};
  if (field === 'category') {
    whereStatementDate = {
      date: { [Op.between]: [startDate, endDate] },
        user_id: userId
    }
    whereStatementRecord = {
      category_id: fieldId,
      isHide: { [Op.not]: true }
    }
  } else if (field === 'account') {
    whereStatementDate = {
      date: { [Op.between]: [startDate, endDate] },
      user_id: userId
    }
    whereStatementRecord = {
      [Op.or]: [{ sender_id: fieldId}, { receiver_id: fieldId }],
      isHide: { [Op.not]: true }
    }
  } else {
    whereStatementDate = {
      date: { [Op.between]: [startDate, endDate] },
      user_id: userId
    }
  }
  const targetTransaction = await db.TransactionDate.findAll({
    order: [['date', 'ASC']],
    attributes: ['id', 'date', ['totalExpense', 'total expense'], ['totalIncome', 'total income']],
    where: whereStatementDate,
    include: {
      model: db.TransactionRecord,
      as: 'transaction records',
      attributes: ['id', 'time', 'type', 'content', 'withdrawal', 'deposit', 'isHide'],
      where: whereStatementRecord,
      include: [{
        model: db.Category,
        as: 'category',
        attributes: ['id', 'name', 'type']
      },
      {
        model: db.Account,
        as: 'withdrawal account',
        attributes: ['id', 'name', 'type', 'isHide'],
      },
      {
        model: db.Account,
        as: 'deposit account',
        attributes: ['id', 'name', 'type', 'isHide'],
      }]
    }
  });
  return targetTransaction;
}

// const getTransactionById = async (dateId, recordId, userId) => {
//   const targetTransaction = await db.TransactionDate.findOne({
//     order: [['date', 'ASC']],
//     attributes: ['id', ['date', 'date'], ['totalExpense', 'total expense'], ['totalIncome', 'total income']],
//     where: { id: dateId, user_id: userId },
//     include: {
//       model: db.TransactionRecord,
//       as: 'transaction records',
//       attributes: ['id', 'time', 'type', 'content', 'withdrawal', 'deposit', 'isHide'],
//       where: { id: recordId, user_id: userId },
//       include: [{
//         model: db.Category,
//         as: 'category',
//         attributes: ['id', 'name', 'type']
//       },
//       {
//         model: db.Account,
//         as: 'withdrawal account',
//         attributes: ['id', 'name', 'type', 'isHide'],
//       },
//       {
//         model: db.Account,
//         as: 'deposit account',
//         attributes: ['id', 'name', 'type', 'isHide'],
//       }]
//     }
//   });
//   return targetTransaction;
// }

const addRecord = async (time, type, content, withdrawal, deposit, categoryId, senderId, receiverId, dateId, userId) => {
  await db.TransactionRecord.create({
    time: time,
    type: type,
    content: content,
    withdrawal: withdrawal,
    deposit: deposit,
    category_id: categoryId,
    sender_id: senderId,
    receiver_id: receiverId,
    date_id: dateId,
    user_id: userId,
  });
}

const updateRecord = async (targetId, time, type, content, withdrawal, deposit, categoryId, senderId, receiverId, dateId, userId) => {
  const targetTransaction = await db.TransactionRecord.findOne({ where: { id: targetId, user_id: userId }});
  if (targetTransaction) {
    await targetTransaction.update({
      time: time,
      type: type,
      content: content,
      withdrawal: withdrawal,
      deposit: deposit,
      category_id: categoryId,
      sender_id: senderId,
      receiver_id: receiverId,
      date_id: dateId,
      user_id: userId
    });
  }
}


// route method

const getTransactionBetween = async (req, res) => {
  const { startDate, endDate } = req.body;
  const targetTransaction = await getTransaction(startDate, endDate, req.user.id);
  if (targetTransaction) {
    res.status(200).send(targetTransaction);
  } else {
    res.status(404).send();
  }
  
}

const getTransactionBetweenByCategory = async (req, res) => {
  const categoryId = Number(req.params.id);
  const { startDate, endDate } = req.body;
  const targetTransaction = await getTransaction(startDate, endDate, req.user.id, categoryId, 'category');
  if (targetTransaction) {
    res.status(200).send(targetTransaction);
  } else {
    res.status(404).send();
  }
}

const getTransactionBetweenByAccount = async (req, res) => {
  const accountId = Number(req.params.id);
  const { startDate, endDate } = req.body;
  const targetTransaction = await getTransaction(startDate, endDate, req.user.id, accountId, 'account');
  if (targetTransaction) {
    res.status(200).send(targetTransaction);
  } else {
    res.status(404).send();
  }
}

const addExpense = async (req, res) => {
  const { date, time, content, withdrawal, deposit, categoryId, senderId } = req.body;
  const operator = await db.Account.findOne({ where: {type: 'expense_operator', user_id: req.user.id}})
  if (!operator) {
    res.status(404).send();
    return;
  }
  const targetDateId = await db.TransactionDate.findOne({
    attributes: ['id'],
    where: { date: date, user_id: req.user.id}
  })
  if (targetDateId) {
    await addRecord(time, 'expense', content, withdrawal, deposit, categoryId, senderId, operator.id, targetDateId.id , req.user.id);
    res.status(201).send({message: 'Transaction is created'});
  } else {
    const newDateId = await db.TransactionDate.create({ date: date, user_id: req.user.id }) 
    await addRecord(time, 'expense', content, withdrawal, deposit, categoryId, senderId, operator.id, newDateId.id, req.user.id);
    res.status(201).send({message: 'Transaction is created'});
  }
}

const addIncome = async (req, res) => {
  const { date, time, content, withdrawal, deposit, categoryId, receiverId } = req.body;
  const operator = await db.Account.findOne({ where: {type: 'income_operator', user_id: req.user.id}})
  if (!operator) {
    res.status(404).send();
    return;
  }
  const targetDateId = await db.TransactionDate.findOne({
    attributes: ['id'],
    where: { date: date, user_id: req.user.id}
  })
  if (targetDateId) {
    await addRecord(time, 'income', content, withdrawal, deposit, categoryId, operator.id, receiverId, targetDateId.id , req.user.id);
    res.status(201).send({message: 'Transaction is created'});
  } else {
    const newDateId = await db.TransactionDate.create({ date: date, user_id: req.user.id }) 
    await addRecord(time, 'income', content, withdrawal, deposit, categoryId, operator.id, receiverId, newDateId.id, req.user.id);
    res.status(201).send({message: 'Transaction is created'});
  }
}

const addTransfer = async (req, res) => {
  const { date, time, content, withdrawal, deposit, senderId, receiverId } = req.body;
  const operator = await db.Category.findOne({ where: {type: 'transfer', user_id: req.user.id}})
  if (!operator) {
    res.status(404).send();
    return;
  }
  const targetDateId = await db.TransactionDate.findOne({
    attributes: ['id'],
    where: { date: date, user_id: req.user.id}
  })
  if (targetDateId) {
    await addRecord(time, 'transfer', content, withdrawal, deposit, operator.id, senderId, receiverId, targetDateId.id , req.user.id);
    res.status(201).send({message: 'Transaction is created'});
  } else {
    const newDateId = await db.TransactionDate.create({ date: date, user_id: req.user.id }) 
    await addRecord(time, 'transfer', content, withdrawal, deposit, operator.id, senderId, receiverId, newDateId.id, req.user.id);
    res.status(201).send({message: 'Transaction is created'});
  }
}

const updateDateSummarizeByDate = async (req, res) => {
  const dateId = Number(req.params.id);
  const targetDate = await db.TransactionDate.findOne({
    where: { id: dateId, user_id: req.user.id }
  });
  if (targetDate) {
    targetDate.totalExpense = await db.TransactionRecord.findAll({
      attributes: [[sequelize.fn('sum', sequelize.col('withdrawal')), 'totalExpense']],
      where: {
        type: 'expense',
        date_id: dateId,
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
    targetDate.totalIncome = await db.TransactionRecord.findAll({
      attributes: [[sequelize.fn('sum', sequelize.col('deposit')), 'totalIncome']],
      where: {
        type: 'income',
        date_id: dateId,
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
    if (targetDate.totalExpense === 'null') targetDate.totalExpense = 0;
    if (targetDate.totalIncome === 'null') targetDate.totalIncome = 0;
    targetDate.save({ fields: ['totalExpense', 'totalIncome'] });
    res.status(200).send({ message: `Your transaction date has been updated.` });
  } else {
    res.status(404).send();
  }
}

const updateExpenseById = async (req, res) => {
  const transactionId = Number(req.params.id);
  const { date, time, content, withdrawal, deposit, categoryId, senderId } = req.body;
  const operator = await db.Account.findOne({ where: {type: 'expense_operator', user_id: req.user.id}})
  if (!operator) {
    res.status(404).send();
    return;
  }
  const targetDateId = await db.TransactionDate.findOne({
    attributes: ['id'],
    where: { date: date, user_id: req.user.id}
  })
  if (targetDateId) {
    await updateRecord(transactionId , time, 'expense', content, withdrawal, deposit, categoryId, senderId, operator.id, targetDateId.id, req.user.id);
    res.status(201).send({message: 'Transaction is updated'});
  } else {
    const newDateId = await db.TransactionDate.create({ date: date, user_id: req.user.id })
    await updateRecord(transactionId , time, 'expense', content, withdrawal, deposit, categoryId, senderId, operator.id, newDateId.id, req.user.id);
    res.status(201).send({message: 'Transaction is updated'});
  }
}

const updateIncomeById = async (req, res) => {
  const transactionId = Number(req.params.id);
  const { date, time, content, withdrawal, deposit, categoryId, receiverId } = req.body;
  const operator = await db.Account.findOne({ where: {type: 'income_operator', user_id: req.user.id}})
  if (!operator) {
    res.status(404).send();
    return;
  }
  const targetDateId = await db.TransactionDate.findOne({
    attributes: ['id'],
    where: { date: date, user_id: req.user.id}
  })
  if (targetDateId) {
    await updateRecord(transactionId , time, 'income', content, withdrawal, deposit, categoryId, operator.id, receiverId, targetDateId.id, req.user.id);
    res.status(201).send({message: 'Transaction is updated'});
  } else {
    const newDateId = await db.TransactionDate.create({ date: date, user_id: req.user.id })
    await updateRecord(transactionId , time, 'income', content, withdrawal, deposit, categoryId, operator.id, receiverId, newDateId.id, req.user.id);
    res.status(201).send({message: 'Transaction is updated'});
  }
}

const updateTransferById = async (req, res) => {
  const transactionId = Number(req.params.id);
  const { date, time, content, withdrawal, deposit, senderId, receiverId } = req.body;
  const operator = await db.Category.findOne({ where: {type: 'transfer', user_id: req.user.id}})
  if (!operator) {
    res.status(404).send();
    return;
  }
  const targetDateId = await db.TransactionDate.findOne({
    attributes: ['id'],
    where: { date: date, user_id: req.user.id}
  })
  if (targetDateId) {
    await updateRecord(transactionId , time, 'transfer', content, withdrawal, deposit, operator.id, senderId, receiverId, targetDateId.id, req.user.id);
    res.status(201).send({message: 'Transaction is updated'});
  } else {
    const newDateId = await db.TransactionDate.create({ date: date, user_id: req.user.id })
    await updateRecord(transactionId , time, 'transfer', content, withdrawal, deposit, operator.id, senderId, receiverId, newDateId.id, req.user.id);
    res.status(201).send({message: 'Transaction is updated'});
  }
}

const deleteRecordById = async (req, res) => {
  const recordId = Number(req.params.id);
  const targetRecord = await db.TransactionRecord.findOne({ where: { id: recordId, user_id: req.user.id } });
  if (targetRecord) {
    await db.TransactionRecord.destroy(
      { where: { id: recordId, user_id: req.user.id } }
    );
  }
  res.status(404).send();
}

const deleteDateById = async (req, res) => {
  const dateId = Number(req.params.id);
  const targetDate = await db.TransactionDate.findOne({ where: { id: dateId, user_id: req.user.id } });
  if (targetDate) {
    const checkForUseDate = await db.TransactionRecord.findOne({ where: { date_id: dateId, user_id: req.user.id } });
    if (!checkForUseDate) {
      await db.TransactionDate.destroy(
        { where: { id: dateId, user_id: req.user.id } }
      );
    } else {
      res.status(404).send();
    } 
  }
  res.status(404).send();
}

module.exports = {
  getTransactionBetween,
  getTransactionBetweenByCategory,
  getTransactionBetweenByAccount,
  addExpense,
  addIncome,
  addTransfer,
  updateDateSummarizeByDate,
  updateExpenseById,
  updateIncomeById,
  updateTransferById,
  deleteRecordById,
  deleteDateById
}