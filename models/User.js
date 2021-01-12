module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
    },
    firstName: {
      type: DataTypes.STRING(255),
    },
    lastName: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });

  model.associate = models => {
    model.hasMany(models.TransactionDate, { foreignKey: 'user_id'});
    model.hasMany(models.TransactionRecord, { foreignKey: 'user_id'});
    model.hasMany(models.Account, { foreignKey: 'user_id'});
    model.hasMany(models.Category, { foreignKey: 'user_id'});
  }

  return model
}