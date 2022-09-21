import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: parseInt(process.env.DB_PORT, 10),
    pool: {
      max: parseInt(process.env.POOL_MAX, 10) || 5, // max database connections
      min: parseInt(process.env.POOL_MIN, 10) || 0,
      acquire: parseInt(process.env.POOL_ACQUIRE, 10) || 3600000, // max time(ms) in trying to get connection
      idle: parseInt(process.env.POOL_IDLE, 10) || 3600000,
      retry: {
        match: [Sequelize.ConnectionRefusedError],
        max: 500
      }
    },
  }
);

export default sequelize;