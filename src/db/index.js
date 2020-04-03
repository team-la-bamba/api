import mongoose from 'mongoose';
import mongodbURI from 'mongodb-uri';
import schemaPlugin from './plugins/schema'
import { loadFiles } from '../lib/utils';
import fs from 'fs';
import path from 'path';

const ucfirst = str => str.charAt(0).toUpperCase() + str.slice(1);

// Create database connection.
export default () => {
  const uri = process.env.MONGODB_URI || 'mongodb://mongodb.default.svc.cluster.local/labamba';
  const options = {
    keepAlive: 1,
    keepAliveInitialDelay: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  };

  mongoose.connect(mongodbURI.formatMongoose(uri), options);
  mongoose.set('debug', process.env.NODE_ENV !== 'production');

  mongoose.connection.on(
    'error',
    console.error.bind(console, 'connection error:')
  );
  mongoose.connection.once('open', () => {
    console.log('Database is connected');
  });

  // Assign plugins to mongoose.
  mongoose.plugin(schemaPlugin);

  // Create models of all schema files.
  fs.readdirSync(__dirname)
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
