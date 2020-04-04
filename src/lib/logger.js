import { Yolog } from '@jitesoft/yolog';
import { ConsolePlugin } from '@jitesoft/yolog/node';

const logger = new Yolog([new ConsolePlugin()], {
  alert: true,
  critical: true,
  debug: (process.env.NODE_ENV === 'DEBUG'),
  emergency: true,
  error: true,
  info: true,
  warning: true
});

logger.setTimestampFunction(() => {
  return new Date().getTime();
});

export default logger;
