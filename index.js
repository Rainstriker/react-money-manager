require('dotenv').config();
const db = require('./models/index');
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/User');
const accountRoutes = require('./routes/Account');
const categoryRoutes = require('./routes/Category');
const transactionRoutes = require('./routes/Transaction');
const data = require('./testData');

require('./config/passport/passport');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);
app.use('/categories', categoryRoutes);
app.use('/transactions', transactionRoutes);

db.sequelize.sync({force: true}).then(() => {
  (async () => {
    await db.User.create(data.testData.username);
    await db.Account.bulkCreate(data.testData.account);
    await db.Category.bulkCreate(data.testData.category);
    await db.TransactionDate.bulkCreate(data.testData.date);
    await db.TransactionRecord.bulkCreate(data.testData.transaction);
  })();
  app.listen(process.env.PORT, () => {
    console.log(`Server is Running at port ${process.env.PORT}`);
  })
});




