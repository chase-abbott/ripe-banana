import  Sequelize  from 'sequelize';
import db from '../utils/db.js';
import Film from './Film.js';

class Studio extends Sequelize.Model {}

Studio.init({
  name: {
    type: Sequelize.DataTypes.STRING,
    require: true
  },
  city: {
    type: Sequelize.DataTypes.STRING
  },
  state: {
    type: Sequelize.DataTypes.STRING
  },
  country: {
    type: Sequelize.DataTypes.STRING
  }
},
{
  sequelize: db,
  modelName: 'Studio',
  underscored: true
});

Film.Studio = Film.belongsTo(Studio);
Studio.Film = Studio.hasMany(Film);

export default Studio;
