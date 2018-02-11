const objectidPattern = /^[0-9a-fA-F]{24}$/

module.exports = function isObjectId (str) {
  return objectidPattern.test(str)
}
