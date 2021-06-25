import Review from './Review.js';
import Reviewer from './Reviewer.js';

Reviewer.hasMany(Review);
Review.belongsTo(Reviewer);
