import express from 'express';

const app = express();

require('./db').default();
require('./http').default(app);

export default app;
