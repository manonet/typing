/**
 * Fixes problem with undefined classNames caused by CSS Modules.
 *
 * @link https://github.com/keyanzhang/identity-obj-proxy/blob/master/src/index.js
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
 */
const proxy = new Proxy(
  {},
  {
    get: (target, key) => {
      if (key === '__esModule') {
        return false;
      }
      return key;
    },
  }
);

module.exports = proxy;
