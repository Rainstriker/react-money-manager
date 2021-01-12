module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Account', {
    name: {
      type: DataTypes.STRING(255),
    },
    type: {
      type: DataTypes.STRING(30)
    },
    balance: {
      type: DataTypes.FLOAT(11,2),
      defaultValue: 0
    },
    isHide: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'accounts',
    timestamps: false,
  });

  model.associate = models => {
    model.belongsTo(models.User, { foreignKey: 'user_id'});
    model.hasMany(models.TransactionRecord, { foreignKey: 'sender_id',});
    model.hasMany(models.TransactionRecord, { foreignKey: 'receiver_id',});
  }

  return model
}