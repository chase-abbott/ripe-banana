import Sequelize from 'sequelize';
import db from '../utils/db.js';

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
  released: {
    type: Sequelize.DataTypes.INTEGER,
    require: true
  }
},
{
  sequelize: db,
  modelName: 'Film',
  underscored: true
});

export default Film;
