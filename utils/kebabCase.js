const lodashKebabCase = require('lodash.kebabcase');
const removeUnicode = require('./removeUnicode');

function kebabCase(text) {
  return lodashKebabCase(removeUnicode(text));
}
module.exports = kebabCase;
