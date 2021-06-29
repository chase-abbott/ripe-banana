import Sequelize from 'sequelize';
import db from '../utils/db.js';

class Actor extends Sequelize.Model {}

Actor.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      require: true,
    },
    dob: {
      type: Sequelize.DataTypes.DATE,
    },
    pob: {
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'Actor',
    underscored: true,
  }
);

export default Actor;
