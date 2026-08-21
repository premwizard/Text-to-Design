import { Logtail } from '@logtail/browser';

const token = import.meta.env.VITE_BETTERSTACK_TOKEN || import.meta.env.VITE_LOGTAIL_SOURCE_TOKEN;

let logtail = null;
if (token) {
  try {
    logtail = new Logtail(token);
  } catch (err) {
    console.warn('[Logger] Failed to initialize Better Stack / Logtail:', err);
  }
}

export const logger = {
  info: (message, context = {}) => {
    console.log(`[INFO] ${message}`, context);
    if (logtail) {
      logtail.info(message, context);
    }
  },
  warn: (message, context = {}) => {
    console.warn(`[WARN] ${message}`, context);
    if (logtail) {
      logtail.warn(message, context);
    }
  },
  error: (message, context = {}) => {
    console.error(`[ERROR] ${message}`, context);
    if (logtail) {
      logtail.error(message, context);
    }
  },
  debug: (message, context = {}) => {
    console.debug(`[DEBUG] ${message}`, context);
    if (logtail) {
      logtail.debug(message, context);
    }
  },
  flush: async () => {
    if (logtail) {
      await logtail.flush();
    }
  }
};
