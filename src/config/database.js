/* eslint-disable import/no-extraneous-dependencies */
const dotenv = require('dotenv');
const { join } = require('path');

const currentDirname = __dirname;
const pathEnv = join(currentDirname, '..', '..', '.env');

dotenv.config({ path: pathEnv });

// console.log(pathEnv)
// console.log(process.env.DATABASE_HOST)

module.exports = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createAt: 'created_at',
    updatedAt: 'updated_at',
  },
  dialectOptions: {
    timezone: '-03:00',
  },
  timezone: '-03:00',
};
