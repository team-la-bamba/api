import fs from 'fs';
import path from 'path';

/**
 * Load files in folder and exclude files.
 *
 * Example input
 * > loadFiles(__dirname, 'index.js')
 *
 * @param {string} dir
 * @param {array|string} excluded
 *
 * @return {array}
 */
export const loadFiles = (dir, excluded = []) => {
  if (!Array.isArray(excluded)) {
    excluded = [excluded];
  }

  return fs.readdirSync(dir)
    .filter(file => {
      return path.extname(file) === '.js' && excluded.indexOf(file) === -1;
    })
    .map(file => {
      return path.basename(file, path.extname(file));
    });
};

/**
 * Load and require files (default).
 *
 * Example input
 * > requireFiles(__dirname, 'index.js')
 *
 * @param {string} dir
 * @param {array|string} excluded
 *
 * @return {array}
 */
export const requireFiles = (dir, excluded = []) => {
  return loadFiles(dir, excluded).map(name => {
    return require(dir + '/' + name).default;
  });
};
