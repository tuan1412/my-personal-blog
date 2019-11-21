import lodashKebabCase from 'lodash.kebabcase';
import removeUnicode from './removeUnicode';

function kebabCase(text) {
  return lodashKebabCase(removeUnicode(text));
}
export default kebabCase;
