import  Sequelize  from 'sequelize';
import db from '../utils/db.js';

export default class Review extends Sequelize.Model {}

Review.init(
  {
    rating: {
      type: Sequelize.DataTypes.INTEGER,
      require: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    review: {
      type: Sequelize.DataTypes.STRING(140),
      require: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Review',
    underscored: true,
  }
);
