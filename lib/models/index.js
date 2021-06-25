import Review from './Review.js';
import Reviewer from './Reviewer.js';
import Studio from './Studio.js';
import Film from './Film.js';

Reviewer.hasMany(Review);
Review.belongsTo(Reviewer);

Studio.hasMany(Film);
Film.belongsTo(Studio);
