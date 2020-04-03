import mongoose from 'mongoose';
import mongodbURI from 'mongodb-uri';
import schemaPlugin from './plugins/schema'
import { loadFiles } from '../lib/utils';

// Create database connection.
export default () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost/labamba';
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
  loadFiles(__dirname, ['index.js']).forEach(file => {
    require('./' + schema);
  });
};
