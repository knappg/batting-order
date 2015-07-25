var combinationGenerator = function (permutationLength) {
  var recursiveGen = function* (itemsToChoose, itemsChosen) {
    if (itemsToChoose.size === 0) {
      yield itemsChosen;
    } else {
      var values = itemsToChoose.values();
      while (true) {
        var item = values.next();
        if (item.done) {break;}
        itemsChosen.push(item.value);
        var itemsToChooseCopy = new Set(itemsToChoose);
        itemsToChooseCopy.delete(item.value);
        yield* recursiveGen(itemsToChooseCopy, itemsChosen);
        itemsChosen.pop();
      }
    }
  };
  var items = new Set();
  for (var i = 0; i < permutationLength; i++) {
    items.add(i);
  }
  return recursiveGen(items, []);
};

module.exports = {
  combinationGenerator: combinationGenerator
}
