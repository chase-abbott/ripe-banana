import { Sequelize, DataTypes } from 'sequelize';
import db from '../utils/db.js';

export default class Review extends Sequelize.Model {}

Review.init(
  {
    rating: {
      type: DataTypes.INTEGER,
      require: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    review: {
      type: DataTypes.STRING(140),
      require: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Review',
    underscored: true,
  }
);
