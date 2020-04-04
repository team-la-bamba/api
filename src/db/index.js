import mongoose from 'mongoose';
import mongodbURI from 'mongodb-uri';
import schemaPlugin from './plugins/schema'
import logger from '../lib/logger';
import fs from 'fs';
import path from 'path';

const ucfirst = str => str.charAt(0).toUpperCase() + str.slice(1);

// Create database connection.
export default async () => {
  const uri = process.env.MONGODB_URI || `mongodb://localhost:27017/labamba`;
  const options = {
    keepAlive: 1,
    keepAliveInitialDelay: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  };

  await mongoose.connect(mongodbURI.formatMongoose(uri), options);
  mongoose.set('debug', process.env.NODE_ENV !== 'production');

  mongoose.connection.on(
    'error',
    (e) => logger.error('Connection error: \n' + e)
  );
  mongoose.connection.once('open', () => {
    logger.info('Database is connected');
  });

  // Assign plugins to mongoose.
  mongoose.plugin(schemaPlugin);

  // Create models of all schema files.
  (await fs.promises.readdir(__dirname))
    .filter(file => {
      return path.extname(file) === '.js' && file !== 'index.js';
    })
    .map(file => {
      return path.basename(file, path.extname(file));
    })
    .forEach(schema => {
      mongoose.model(ucfirst(schema), require('./' + schema));
    });
};
