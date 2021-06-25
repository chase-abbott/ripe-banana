import  Sequelize  from 'sequelize';
import db from '../utils/db.js';
import Review from './Review.js';

export default class Reviewer extends Sequelize.Model {}

Reviewer.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      require: true,
    },
    company: {
      type: Sequelize.DataTypes.STRING,
      require: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Reviewer',
    underscored: true,
  }
);

Review.Reviewer = Review.belongsTo(Reviewer);
Reviewer.Review = Reviewer.hasMany(Review);
