const testData = {
  username: {
    username: 'test_account@mail.com',
    password: '$2a$12$20uvuJ88E8kfphoScrAjlOl1cJKcdrEPThyBQM.j9yyanGt9gSnDG',
    firstName: 'Sippakorn',
    lastName: 'Phuakpong',
  },
  account: [{
    name: 'EXPENSE_TRANSFER_ACCOUNT',
    type: "expense_operator",
    isHide: true,
    user_id: 1
  },
  {
    name: 'INCOME_TRANSFER_ACCOUNT',
    type: "income_operator",
    isHide: true,
    user_id: 1
  },
  {
    name: 'test_cash',
    type: 'cash',
    user_id: 1
  },
  {
    name: 'test_account',
    type: 'account',
    user_id: 1
  }],
  category: [{
    name: 'transfer',
    type: 'transfer',
    user_id: 1
  },
  {
    name: 'food',
    type: 'expense',
    user_id: 1
  },
  {
    name: 'equipment',
    type: 'expense',
    user_id: 1
  },
  {
    name: 'freelance',
    type: 'income',
    user_id: 1
  },
  {
    name: 'salary',
    type: 'income',
    user_id: 1
  }],
  date: [{
    date: '2021-01-01',
    user_id: 1
  }, 
  {
    date: '2021-01-11',
    user_id: 1
  },
  {
    date: '2021-01-21',
    user_id: 1
  },
  {
    date: '2021-02-01',
    user_id: 1
  },
  {
    date: '2021-02-05',
    user_id: 1
  }],
  transaction: [{
    time: '11:25:00',
    content: 'fish',
    withdrawal: 100,
    category_id: 2,
    sender_id: 3,
    receiver_id: 1,
    date_id: 1,
    user_id: 1
  },
  {
    time: '15:05:00',
    content: 'work',
    type: 'income',
    deposit: 500,
    category_id: 4,
    sender_id: 2,
    receiver_id: 4,
    date_id: 1,
    user_id: 1
  },
  {
    time: '19:40:00',
    content: 'beef',
    withdrawal: 50,
    category_id: 2,
    sender_id: 3,
    receiver_id: 1,
    date_id: 1,
    user_id: 1
  },
  {
    time: '09:30:00',
    content: 'potato chips',
    withdrawal: 120,
    category_id: 2,
    sender_id: 3,
    receiver_id: 1,
    date_id: 2,
    user_id: 1
  },
  {
    time: '15:55:00',
    content: 'cookies',
    withdrawal: 300,
    category_id: 2,
    sender_id: 3,
    receiver_id: 1,
    date_id: 2,
    user_id: 1
  },
  {
    time: '22:30:00',
    content: 'wafer',
    withdrawal: 250,
    category_id: 2,
    sender_id: 3,
    receiver_id: 1,
    date_id: 2,
    user_id: 1
  },
  {
    time: '12:40:00',
    content: 'lamb',
    withdrawal: 400,
    category_id: 3,
    sender_id: 3,
    receiver_id: 1,
    date_id: 3,
    user_id: 1
  },
  {
    time: '18:36:00',
    content: 'book',
    withdrawal: 500,
    category_id: 3,
    sender_id: 3,
    receiver_id: 1,
    date_id: 3,
    user_id: 1
  },
  {
    time: '21:28:00',
    content: 'color pencils',
    withdrawal: 350,
    category_id: 3,
    sender_id: 3,
    receiver_id: 1,
    date_id: 3,
    user_id: 1
  },
  {
    time: '21:28:00',
    type: 'income',
    content: 'salary',
    deposit: 15000,
    category_id: 5,
    sender_id: 2,
    receiver_id: 4,
    date_id: 3,
    user_id: 1
  },
  {
    time: '08:12:00',
    content: 'fried fish',
    withdrawal: 80,
    category_id: 2,
    sender_id: 3,
    receiver_id: 1,
    date_id: 4,
    user_id: 1
  },
  {
    time: '12:01:00',
    content: 'tom yum',
    withdrawal: 50,
    category_id: 2,
    sender_id: 3,
    receiver_id: 1,
    date_id: 4,
    user_id: 1
  },
  {
    time: '16:33:00',
    type: 'income',
    content: 'work',
    deposit: 500,
    category_id: 4,
    sender_id: 3,
    receiver_id: 2,
    date_id: 4,
    user_id: 1
  },
  {
    time: '16:33:00',
    type: 'transfer',
    content: 'transfer to cash',
    withdrawal: 500,
    deposit: 500,
    category_id: 1,
    sender_id: 4,
    receiver_id: 3,
    date_id: 5,
    user_id: 1
  }]
}

module.exports = {
  testData,
}
