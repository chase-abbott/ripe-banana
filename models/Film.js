import Sequelize from 'sequelize';
import db from '../lib/utils/db.js';

class Film extends Sequelize.Model { }

Film.init({
  title: {
    type: Sequelize.DataTypes.STRING,
    require: true
  },
  studio: {
    type: Sequelize.DataTypes.STRING,
    require: true
  },
  release: {
    type: Sequelize.DataTypes.INTEGER,
    require: true
  }
},
  {
    sequelize: db,
    ModelName: 'Studio',
    underscored: true
  });

export default Film;

