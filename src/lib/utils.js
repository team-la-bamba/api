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

/**
 * Load files in folder and exclude files.
 *
 * Example input
 * > loadFiles(__dirname, 'index.js')
 *
 * @param {string} dir
 * @param {array|string} excluded
 *
 * @return {Promise<array<string>>}
 */
export const loadFilesAsync = async (dir, excluded = []) => {
  excluded = Array.isArray(excluded) ? excluded : [excluded];

  return (await fs.promises.readdir(dir))
    .filter(f => path.extname(f) === 'js' && excluded.indexOf(f) === -1)
    .map(f => path.basename(f, path.extname(f)));
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
export const requireFilesAsync = async (dir, excluded = []) => {
  return await loadFilesAsync(dir, excluded)
    .map(f => require(dir + '/' + f).default);
};
