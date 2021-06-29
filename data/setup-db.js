import sequelize from '../lib/utils/db.js';

run();

async function run() {
  await sequelize.sync({ force: true });
}
