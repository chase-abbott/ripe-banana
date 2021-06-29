import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  //dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  //ssl: true,
});

export default db;
