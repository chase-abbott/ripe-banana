import Sequelize from 'sequelize';
import db from '../utils/db.js';

export default class Film extends Sequelize.Model {}

Film.init(
  {
    title: {
      type: Sequelize.DataTypes.STRING,
      require: true,
    },
    released: {
      type: Sequelize.DataTypes.INTEGER,
      require: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Film',
    underscored: true,
  }
);
