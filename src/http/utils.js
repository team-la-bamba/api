import methods from 'methods';

/**
 * Catch async/await errors.
 *
 * @param {function} fn
 *
 * @return {function}
 */
const catchAsyncErrors = fn => {
  return (req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise && routePromise.catch) {
      routePromise.catch(err => {
        next(err);
      });
    }
  };
};

/**
 * Flatten array.
 *
 * @param {array} list
 *
 * @return {array}
 */
const flatten = list => {
  return list.reduce((a, b) => {
    return a.concat(Array.isArray(b) ? flatten(b) : b);
  }, []);
};

/**
 * Wrap Express's router to handle async/await errors.
 *
 * @param {object} router
 *
 * @return {object}
 */
export const asyncRouter = router => {
  const slice = Array.prototype.slice;

  methods.concat('all').forEach(method => {
    const original = router[method];
    router[method] = function (path) {
      const handles = flatten(slice.call(arguments, 1));
      const patched = [];

      handles.forEach(handle => {
        if (typeof handle !== 'function') {
          const type = toString.call(handle);
          const msg = `Route.all() requires a callback function but got a ${type}`;
          throw new TypeError(msg);
        }

        patched.push(catchAsyncErrors(handle));
      });

      original.call(this, path, patched);
    };
  });

  return router;
};
