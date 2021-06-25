import { Sequelize, DataTypes } from 'sequelize';
import db from '../utils/db.js';

export default class Reviewer extends Sequelize.Model {}

Reviewer.init(
  {
    name: {
      type: DataTypes.STRING,
      require: true,
    },
    company: {
      type: DataTypes.STRING,
      require: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Reviewer',
    underscored: true,
  }
);
