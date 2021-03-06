const applyChoiceSetAsEnum = require('../utils/apply-choice-set-as-enum')
const NUMERIC_ATTRIBUTE_KEYS = [
  'minimum',
  'exclusiveMinimum',
  'maximum',
  'exclusiveMaximum',
  'multipleOf'
]

module.exports = function numberCategoryProcessor (target, hint) {
  NUMERIC_ATTRIBUTE_KEYS.forEach(
    (key) => {
      if (Object.prototype.hasOwnProperty.call(hint, key)) {
        target[key] = hint[key]
      }
    }
  )
  applyChoiceSetAsEnum(target, hint)
}
