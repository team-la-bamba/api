import express from 'express';

const app = express();

require('./http').default(app);

export default app;
