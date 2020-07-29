module.exports = function applyChoiceSetAsEnum (target, hint) {
  if (Object.prototype.hasOwnProperty.call(hint, 'choiceSet')) {
    target.enum = Object.values(hint.choiceSet)
    target.enumNames = Object.keys(hint.choiceSet)
  }
}
