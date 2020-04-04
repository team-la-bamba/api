import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { loadFilesAsync } from '../lib/utils';
import { asyncRouter } from './utils';

const http = async (app) => {
  app.enable('trust proxy');
  app.set('port', process.env.PORT || 3000);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  const router = asyncRouter(express.Router());
  const controllers = path.join(__dirname, 'controllers');
  (await loadFilesAsync(controllers)).forEach(file => {
    require(path.join(controllers, file))(router);
  });
  app.use('/', router);

  // Not found middleware.
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Error response middleware.
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: [
        {
          message: err.message
        }
      ],
      success: false
    });
  });
};

export {
  http
}

export default http;
