module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('TransactionDate', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    totalExpense: {
      type: DataTypes.FLOAT(34,2),
      defaultValue: 0,
      setterMethods(value) {
        if (value === NaN) {
          this.setDataValue('totalExpense', 0);
        } else {
          this.setDataValue('totalExpense', value);
        }
      }
    },
    totalIncome: {
      type: DataTypes.FLOAT(34,2),
      defaultValue: 0,
      setterMethods(value) {
        if (value === NaN) {
          this.setDataValue('totalIncome', 0);
        } else {
          this.setDataValue('totalIncome', value);
        }
      }
    },
  }, {
    tableName: 'transaction_dates',
    timestamps: false,
  });

  model.associate = models => {
    model.belongsTo(models.User, { foreignKey: 'user_id'});
    model.hasMany(models.TransactionRecord, { foreignKey: 'date_id', as: 'transaction records'});
  }

  return model
}