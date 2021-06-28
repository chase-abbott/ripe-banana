import Actor from './Actor.js';
import Film from './Film.js';
import Review from './Review.js';
import Reviewer from './Reviewer.js';
import Studio from './Studio.js';

Reviewer.hasMany(Review, {
  foreignKey: {
    name: 'reviewer',
    allowNull: false,
  },
});
Review.belongsTo(Reviewer, {
  foreignKey: {
    name: 'reviewer',
    allowNull: false,
  },
});

Studio.hasMany(Film, {
  foreignKey: {
    name: 'studio',
    allowNull: false,
  },
});
Film.belongsTo(Studio, {
  foreignKey: {
    name: 'studio',
    allowNull: false,
  },
});

Film.belongsToMany(Actor, { through: 'ActorFilms' });
Actor.belongsToMany(Film, {
  through: 'ActorFilms',
  foreignKey: {
    allowNull: false,
  },
});

Film.hasOne(Review, {
  foreignKey: {
    name: 'film',
    allowNull: false,
  },
});
Review.belongsTo(Film, {
  foreignKey: {
    name: 'film',
    allowNull: false,
  },
});
