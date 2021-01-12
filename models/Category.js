module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING(255),
    },
    type: {
      type: DataTypes.STRING(30),
    },
  }, {
    tableName: 'categories',
    timestamps: false,
  });

  model.associate = models => {
    model.belongsTo(models.User, { foreignKey: 'user_id'});
    model.hasMany(models.TransactionRecord, { foreignKey: 'category_id', as: 'Amount'});
  }

  return model
}