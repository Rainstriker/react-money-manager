const starterAccount = userId => {
  return [{
      name: 'EXPENSE_TRANSFER_ACCOUNT',
      type: "expense_operator",
      isHide: true,
      user_id: userId
    },
    {
      name: 'INCOME_TRANSFER_ACCOUNT',
      type: "income_operator",
      isHide: true,
      user_id: userId
    },
    {
      name: 'เงินสด',
      type: 'cash',
      user_id: userId
    },
    {
      name: 'บัญชีธนาคาร',
      type: 'account',
      user_id: userId
    },
    {
      name: 'บัตรเดบิต',
      type: 'card',
      user_id: userId
    }];
}

const starterCategory = userId => {
  return [{
      name: 'transfer',
      type: 'transfer',
      user_id: userId
    },
    {
      name: 'อาหาร',
      type: 'expense',
      user_id: userId
    },
    {
      name: 'การเข้าสังคม',
      type: 'expense',
      user_id: userId
    },
    {
      name: 'การท่องเที่ยว',
      type: 'expense',
      user_id: userId
    },
    {
      name: 'ความบันเทิง',
      type: 'expense',
      user_id: userId
    },
    {
      name: 'การเดินทาง',
      type: 'expense',
      user_id: userId
    },
    {
      name: 'สุขภาพ',
      type: 'expense',
      user_id: userId
    },
    {
      name: 'เสื้อผ้า',
      type: 'expense',
      user_id: userId
    },
    {
      name: 'ความงาม',
      type: 'expense',
      user_id: userId
    },
    {
      name: 'ของใช้ในบ้าน',
      type: 'expense',
      user_id: userId
    },
    {
      name: 'การศึกษา',
      type: 'expense',
      user_id: userId
    },
    {
      name: 'ของขวัญ',
      type: 'expense',
      user_id: userId
    },
    {
      name: 'การลงทุน',
      type: 'expense',
      user_id: userId
    },
    {
      name: 'เงินเดือน',
      type: 'income',
      user_id: userId
    },
    {
      name: 'โบนัส',
      type: 'income',
      user_id: userId
    },
    {
      name: 'อาชีพเสริม',
      type: 'income',
      user_id: userId
    },
    {
      name: 'เสี่ยงโชค',
      type: 'income',
      user_id: userId
    },
    {
      name: 'ธุรกิจส่วนตัว',
      type: 'income',
      user_id: userId
    },]
}
  
module.exports = {
  starterAccount,
  starterCategory
}
