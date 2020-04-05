import { Yolog } from '@jitesoft/yolog';
import { ConsolePlugin } from '@jitesoft/yolog/node';

const logger = new Yolog([new ConsolePlugin()], {
  alert: true,
  critical: true,
  debug: (process.env.DEBUG?.toUpperCase() === 'TRUE' || process.env.NODE_ENV?.startsWith('dev')),
  emergency: true,
  error: true,
  info: true,
  warning: true
});

logger.setTimestampFunction(() => {
  return new Date().getTime();
});

export default logger;
