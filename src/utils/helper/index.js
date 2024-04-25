function filterObjectKeys(object, allowedKeys) {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => allowedKeys.includes(key))
  );
}
module.exports = {
  filterObjectKeys,
};
