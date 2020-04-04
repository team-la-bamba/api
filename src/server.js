import 'dotenv/config';
import logger from './lib/logger';

Promise.resolve().then(async () => {
  await logger.info('Server starting...');
  await logger.debug('Logging with debug is enabled.');
  (await require('./app').default).listen(process.env.PORT || 3000);
}).catch(error => logger.error(error) && process.exit(1));

