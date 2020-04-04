import express from 'express';
import db from './db';
import { http } from './http';

const app = express();

const init = async (app) => {
  await db();
  await http(app);
  return app;
};

export default init(app);

