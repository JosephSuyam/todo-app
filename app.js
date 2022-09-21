import * as dotenv from "dotenv";
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import baseRouter from "./src/routes/base.route.js";
import sequelize from './src/models/index.js';

dotenv.config()
const corsOptions = {
  origin: 'http://localhost:8081'
};
const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;

app.all('*', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Content-Type, x-jwt-token');
  if ('OPTIONS' === req.method) return res.sendStatus(200);
  next()
});

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api', baseRouter);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
  // Setup tables
  sequelize.sync(); // {force: true}
} catch (error) {
  console.error('Unable to connect to the database: ', error);
}

app.listen(PORT, () => console.log(`Server running on port: ${PORT}.`));