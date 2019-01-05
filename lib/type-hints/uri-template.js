const makeBase = require('../utils/make-base')
const applyStringAttributes = require('../utils/apply-string-attributes')
module.exports = function uriReferenceProcessor (hint) {
  const { propertyValue, target } = makeBase(hint, 'string')
  applyStringAttributes(target, hint)
  target.format = 'uri-template'
  return propertyValue
}