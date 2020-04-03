import app from './app';

const debug = require('debug')('api');
const port = process.env.PORT || 3000;

debug('Server starting...');
debug('logging with debug enabled!');

app.listen(port);
