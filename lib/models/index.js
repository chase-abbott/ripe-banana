import Actor from './Actor.js';
import Film from './Film.js';
import Review from './Review.js';
import Reviewer from './Reviewer.js';
import Studio from './Studio.js';

Reviewer.hasMany(Review);
Review.belongsTo(Reviewer);

Studio.hasMany(Film);
Film.belongsTo(Studio);

Film.belongsToMany(Actor);
Actor.belongsToMany(Film);

Review.hasOne(Film);
Film.belongsTo(Review);
