import Review from './Review.js';
import Reviewer from './Reviewer.js';
import Studio from './Studio.js';
import Film from './Film.js';
import Actor from './Actor.js';

Reviewer.hasMany(Review);
Studio.hasMany(Film);
Film.hasMany(Actor);
Actor.hasMany(Film);
