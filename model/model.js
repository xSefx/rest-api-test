const { DataTypes } = require('sequelize');

const sequelize = require('../db/dbConnect');
// const Item = require('./item.model');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    require: true,
  },
  password: { type: DataTypes.STRING, allowNull: false, require: true },
});

const Item = sequelize.define(
  'item',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, require: true },
    description: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    file: { type: DataTypes.STRING },
    createdBy: { type: DataTypes.DATE, defaultValue: Date.now() },
  },
  {
    hooks: {
      afterCreate: function () {
        console.log('aftercreate');
      },
    },
  }
);

User.hasMany(Item, { onDelete: 'cascade' });
Item.belongsTo(User);

module.exports = { User, Item };
