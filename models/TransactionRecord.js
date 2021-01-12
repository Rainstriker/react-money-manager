module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('TransactionRecord', {
    time: {
      type: DataTypes.TIME,
      defaultValue: '00:00:00'
    },
    type: {
      type: DataTypes.STRING(30),
      defaultValue: 'expense'
    },
    content: {
      type: DataTypes.STRING(255),
      defaultValue: ''
    },
    withdrawal: {
      type: DataTypes.FLOAT(11,2),
      defaultValue: 0,
    },
    deposit: {
      type: DataTypes.FLOAT(11,2),
      defaultValue: 0,
    },
    isHide: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'transaction_records',
    timestamps: false,
  });

  model.associate = models => {
    model.belongsTo(models.User, { foreignKey: 'user_id'});
    model.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category'});
    model.belongsTo(models.Account, { foreignKey: 'sender_id', as: 'withdrawal account'});
    model.belongsTo(models.Account, { foreignKey: 'receiver_id', as: 'deposit account'});
    model.belongsTo(models.TransactionDate, { foreignKey: 'date_id', as: 'Date'});
  }

  return model
}